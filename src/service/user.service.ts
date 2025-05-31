import { requestInterface } from "../interface/request.interface"
import userModel from "../models/user.model"
import { encryptionPassword } from "../utils/bcrypt"
class userService{
    public signup=async(request:requestInterface)=>{
        request.password=await encryptionPassword(request.password)
        await userModel.create(request)
    }
}
export default new userService()