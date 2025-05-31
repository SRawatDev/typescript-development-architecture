import { Document } from "mongoose"
export interface Register extends Document{
    firstName:string,
    lastName:string,
    email:string,
    passord:string,
    
}
