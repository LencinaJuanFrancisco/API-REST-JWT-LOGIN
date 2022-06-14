//const url = "https://api-rest-jwt-utn.herokuapp.com"
import axios from "axios";

export const getPosReq = async (callback) => {
  try {
    const res =  await axios.get("posts");
    return callback(res.data)
  } catch (error) {
    console.log("vengo del getPosReq ", error);
  }
};
export const getOnePostReq = async (id) => {
  const res = await axios.get(`/posts/${id}`);
  console.log("getOnepost", res.data[0]);
  return res.data[0];
};
export const deletePostRequest = async (id) => {
  try {
    const res = await axios.delete(`/posts/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createPostReq = async (post) => {
  try {
    console.log("entre al createPost y esto vino", post);
    const res = await axios.post("/posts", post);
    //console.log('axios', res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updatePostReq = async (id, post) => {
 const res =  await axios.put(`/posts/${id}`, post);
 console.log('esto es res', res);
    return res
};
