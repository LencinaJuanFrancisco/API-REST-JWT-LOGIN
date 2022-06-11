import axios from "axios";
import { toast} from "react-hot-toast";

export const getUsersReq =async()=>{
    const res = await axios.get('/users')
    return res.data
}

export const loginReq =async(user)=>{
    try {
        const res = await axios.post('/users/login',user)
        console.log('loginReq-->😍',res.data);
        return res.data
        
    } catch (error) {
        console.log("😫😫😫😫😫",error.response.data);
        return  error.response
    }
}
 export const createUserReq=async(user)=>{
            const form = new FormData()
            for (let key in user){
                form.append(key,user[key])
            }
            return await axios.post('/users/register',form,{
                headers:{
                    "content-Type":"multipart/form-data"
                }
            })
 }