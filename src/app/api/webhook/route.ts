
export async function POST(req:Request):Promise<Response>{
    try {
        const event=await req.json();   
        console.log(event);
        const subId=event.data.subscription_id;

        console.log(subId);

        return Response.json({
            success:true,
            message:"Webhook received",
        },{status:200})
        
    } catch (error) {
         return Response.json({
            success:false,
            message:"Internal Server Error",
         },{status:500})
    }
}