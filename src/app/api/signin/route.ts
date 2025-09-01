import { Database_Connection } from "@/app/lib/db"
import { Signin_User } from "../../../../types/user"
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(req: Request): Promise<Response> {
    try {
        let { email, password } = (await req.json()) as Signin_User

        if (!email || !password) {
            return Response.json({
                message: "Missing required fields",
                success: false
            }, { status: 400 })
        }

        await Database_Connection();
        let IsExist = await UserModel.findOne({ email })
        if (!IsExist) {
            return Response.json({
                message: "Please signup first",
                success: false
            }, { status: 404 })
        }

        let isPasswordCorrect = await bcrypt.compare(password, IsExist.password)
        if (!isPasswordCorrect) {
            return Response.json({
                message: "Invalid password",
                success: false
            }, { status: 401 })
        }

        let { password: _, ...safeUser } = IsExist.toObject();
        const token = jwt.sign({ user: safeUser }, process.env.JWT_PrivateKey as string, {expiresIn: '7d' });
        
      
        
        if (!token) {
            return Response.json({
                message: "Something went wrong",
                success: false
            }, { status: 500 })
        }

        // Set the token in cookies using Response headers
        const response = Response.json({
            message: "Login successful",
            success: true,
            data: {
                ...safeUser
            }
        }, { status: 200 });
        
        response.headers.set('Set-Cookie', `verificationtoken=${token}; Path=/; HttpOnly; SameSite=Strict`);
        return response;

    } catch (error: any) {
   
        return Response.json({
            message: error.message || "Something went wrong",
            error: error.message,
            success: false
        }, { status: 500 })
    }
}