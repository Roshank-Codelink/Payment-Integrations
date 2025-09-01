import ProductMode from "@/app/model/SubscriptionPlans";



export async function POST(req:Request):Promise<Response>{
    try {

        const {Product_Id,userId,Product_Price,Product_DurationInDays}=await req.json();
        console.log(Product_Id,userId,Product_Price,Product_DurationInDays);
        




        return Response.json({
            success:true,
            message:"Payment Successful",
        },{status:200})
    } catch (error) {
        return Response.json({
            success:false,
            message:"Internal Server Error",
        },{status:500})
    }
}