import mongoose from "mongoose";
import { SubscriptionPlans } from "../../../types/product";



const ProductSchema=new mongoose.Schema({
    Subscription_Name:{
        type:String
    },
    Subsciption_Id:{
        type:String
    },
    Subscription_Price:{
        type:Number,
    }
    ,
    Subscription_transaction_Id:{
        type:String
    },
    Subscription_DurationInDays:{
        type:Date
    }   
})
const ProductMode=mongoose.models.SubscriptionPlans||mongoose.model<SubscriptionPlans>("SubscriptionPlans",ProductSchema);
export default ProductMode;