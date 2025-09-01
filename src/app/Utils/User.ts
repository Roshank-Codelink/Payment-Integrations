import axios from "axios"

export const Signup = async (userData: { name: string; email: string; password: string }) => {
    try {
       let res = await axios.post("http://localhost:3000/api/signup", userData, {withCredentials: true});
       return res;
    } catch (error: any) {
       return error.response.data;
    }
}


export const Signin = async (userData: { email: string; password: string }) => {
    try {
       let res = await axios.post("http://localhost:3000/api/signin", userData, {withCredentials: true});
       return res;
    } catch (error: any) {
        return error.response.data;
    }
}