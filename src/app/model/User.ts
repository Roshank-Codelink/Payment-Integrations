import mongoose, {Schema, Document } from "mongoose";
import { User } from "../../../types/user";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
