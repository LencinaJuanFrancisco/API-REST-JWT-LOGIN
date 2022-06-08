import axios from "axios";


export const getUsersReq =async()=>{
    const res = await axios.get('/users')
    return res.data
}

export const loginReq =async(user)=>{
    const res = await axios.post('/users/login',user)
    console.log('loginReq--->😎', res.data);
    return res.data
}