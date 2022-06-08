import axios from "axios";


export const getUsersReq =async()=>{
    const res = await axios.get('/users')
    return res.data
}

export const loginReq =async(user)=>{
    try {
        const res = await axios.post('/users/login',user)
        console.log('loginReq--->😎', res.data);
        return res.data
        
    } catch (error) {
        console.log("😎",error.response.data);
        return await error.response.data
    }
}