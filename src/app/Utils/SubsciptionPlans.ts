import { Product } from "../../../types/product";
import axios from "axios";

export const SubsciptionPlans = async (ProductData: Product) => {
    try {
        const res = await axios.post("http://localhost:3000/api/payment", ProductData, {withCredentials: true});
    } catch (error) {
         console.log(error);
    }
}