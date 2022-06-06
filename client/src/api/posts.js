//const url = "https://api-rest-jwt-utn.herokuapp.com"
import axios from 'axios'


export const getPosReq=async()=>{
   try {
    return await axios.get("posts")       
   } catch (error) {
       console.log('vengo del getPosReq ',error);
   }
    
}
export const deletePostRequest = async (id)=>{
    try {
        const res= await axios.delete(`/posts/${id}`)
        return res
        
    } catch (error) {
       console.log(error)    }
} 
export const createPostReq= async(post)=>{
    try {
        const res = await axios.post('/posts',post)
        console.log('axios', res);
        return res
    } catch (error) {
        console.log(error);
    }
}
