import axios from "axios";
import { Product } from "../../../types/product";

// gernate a Token for PayPal
const paypal_API=process.env.Paypal_BaseURL as string;

export const PaypalAccessToken=async()=>{
    try {
        const response=await axios.post(`${paypal_API}/v1/oauth2/token`,{
            grant_type:"client_credentials"
        },{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            auth:{
                username:process.env.Paypal_ClientID as string,
                password:process.env.Paypal_Secret as string
            }
        })
        return response.data.access_token;
    } catch (error:any) {
        console.log(error.response.data);
        throw error;
    }
}

// Subscription Creation
export const SubscriptionCreation=async(Product_Data:Product & { userId: string })=>{
    try {
       const access_token=await  PaypalAccessToken();
       
       if (!access_token) {
           throw new Error('Failed to get PayPal access token');
       }

       const subscription = await axios.post(`${paypal_API}/v1/billing/subscription`,{
        plan_id:Product_Data.Product_Id,
        subscriber:{
            email_address:Product_Data.userId // This should be user's email, not userId
        },
        application_context:{
            brand_name:"PayPal Subscription",
            return_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel"
        }
       }, {
           headers: {
               'Authorization': `Bearer ${access_token}`,
               'Content-Type': 'application/json'
           }
       });

       console.log('PayPal subscription created:', subscription.data);
       return subscription.data;

    } catch (error) {
        console.log('PayPal subscription error:', error);
        throw error;
    }
}
