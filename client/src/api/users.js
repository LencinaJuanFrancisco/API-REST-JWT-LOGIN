import axios from "axios";

export const getUsersReq = async () => {
  const res = await axios.get("/users");
  return res.data;
};

export const loginReq = async (user) => {
  try {
    const res = await axios.post("/users/login", user);
    console.log("loginReq-->😍", res.data);
    return res.data;
  } catch (error) {
    console.log("😫😫😫😫😫", error.response.data);
    return error.response;
  }
};
export const createUserReq = async (user) => {
  console.log("estoy en createUserReq");
  try {
  const form = new FormData();
  for (let key in user) {
    form.append(key, user[key]);
  }
    const res = await axios.post("/users/register", form, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    if (res.data.status != 201) {
      console.log("entre a la cuestion del error", res.response.data);
      return res.response.data;
    }
    console.log("esto mado al context de usuario",res.data)
    return res.data;
    
    
  } catch (error) {
   console.log("que mierda viene aca", error);
    return error.response.data;
  }
};
