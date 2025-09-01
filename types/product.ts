

export interface Product{
    Product_Id:string;
    Product_Name:string;
    Product_Description:string;
    Product_Price:number;
    Product_Images:string;
    Product_DurationInDays:Date;
    Product_isActive:boolean;
}

export interface SubscriptionPlans{
    Subscription_Name:string;
    Subsciption_Id:string;
    Subscription_Price:number;
    Subscription_transaction_Id:string;
    Product_DurationInDays:Date;
}