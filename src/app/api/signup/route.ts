"use server";

import UserModel from "@/app/model/User";
import { Signup_User } from "../../../../types/user";
import { Database_Connection } from "../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request): Promise<Response> {
    try {
        const { name, email, password } = (await req.json()) as Signup_User;

        if (!name || !email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "Missing required fields",
                },
                { status: 400 }
            );
        }

        await Database_Connection();

        const isExist = await UserModel.findOne({ email });
        if (isExist) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists",
                },
                { status: 409 }
            );
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT || "10", 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const { password: _, ...safeUser } = user.toObject();

        return Response.json(
            {
                success: true,
                message: "Signup successful",
                data: safeUser,
            },
            { status: 201 }
        );
    } catch (error:any) {
        console.error("Signup error:", error);
        return Response.json(
            {
                success: false,
                message: "Internal server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
