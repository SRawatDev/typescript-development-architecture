import mongoose from 'mongoose';
import { Register } from '../interface/user.interface';
const userSchema = new mongoose.Schema({
    firstName: { type: String, },
    lastName: { type: String, },
    email: { type: String },
});
const userModel=mongoose.model<Register>("users",userSchema)
export default userModel


