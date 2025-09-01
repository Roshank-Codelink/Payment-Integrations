import mongoose from 'mongoose';


let Mongodb_URL=process.env.Mongodb_Base_Url as string;


export const Database_Connection=async()=>{
    try {
        await  mongoose.connect(Mongodb_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
         console.log("Connection Error",error)
    }
}
    



