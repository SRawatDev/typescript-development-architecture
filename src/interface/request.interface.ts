import { Request } from "express";
export interface requestInterface extends Request{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}