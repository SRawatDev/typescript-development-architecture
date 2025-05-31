import bcrypt from "bcrypt"
export const encryptionPassword=async(password:string)=>{
    const hashPassword=await bcrypt.hash(password,parseInt(process.env.saltnumber as string))
    return hashPassword
}