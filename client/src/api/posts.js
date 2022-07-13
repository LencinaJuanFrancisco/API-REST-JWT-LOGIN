//const url = "https://api-rest-jwt-utn.herokuapp.com"
import axios from "axios";



export const getPosReq = async () => {
  try {
    const res =  await axios.get("/posts");
    console.log('😀😀😀😀',res.data);
    return res.data
  } catch (error) {
    console.log("vengo del getPosReq ", error);
  }
};
export const getOnePostReq = async (id) => {
  const res = await axios.get(`/posts/${id}`);
  //console.log("getOnepost", res.data[0]);
  return res.data[0];
};
export const deletePostRequest = async (id,jwt) => {
  try {
    const res = await axios.delete(`/posts/${id}`,{
      headers: {
        Authorization: `Bearer ${jwt}`
       }
    });
    return res.status
  } catch (error) {
    console.log(error.response.data.message)
    return error.response.data.message
  }
};
export const createPostReq = async (post,jwt) => {
  try {
    const form = new FormData()
    //console.log("entre al createPost y esto vino", post);
    for (let key in post) {
      form.append(key, post[key]);
    }
    const res = await axios.post("/posts", form,{
      headers: {
       Authorization: `Bearer ${jwt}`,
       "content-Type": "multipart/form-data",
      }
     });
     return res.status
  } catch (error) {
    console.log(error.response.data.message)
    return error.response.data.message
  }
};
export const updatePostReq = async (id, upPost,jwt) => {
  try {
    const form = new FormData();
    for (let key in upPost){
      form.append(key,upPost[key])
  }
  const res = await axios.put(`/posts/${id}`, form,{
    headers: {
     Authorization: `Bearer ${jwt}`,
     "content-Type": "multipart/form-data",
    }
   });
   return res.status
    
  } catch (error) {
    console.log(error.response.data.message)
    return error.response.data.message
  }
};
