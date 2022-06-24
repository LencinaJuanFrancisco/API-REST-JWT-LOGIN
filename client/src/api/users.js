import axios from "axios";

//all users
export const getUsersReq = async () => {
  try {
    const res = await axios.get("/users");
    return res.data;
    
  } catch (error) {
    return error.response.data;
  }
};
//one user
export const getUserReq=async(id)=>{
    try {
        //console.log('llega el id aca getUserReq',id);
        const res = await axios.get(`/users/${id}`)
       // console.log('esto me devolvio el getUserReq',res.data);
        return res.data
    } catch (error) {
        console.log(error);
        return error.response.data;
    }

}

//login
export const loginReq = async (user) => {
  try {
    const res = await axios.post("/users/login", user);
    //console.log("loginReq-->😍", res.data);
    return res.data;
  } catch (error) {
    
    return error.response;
  }
};
//create
export const createUserReq = async (user) => {
  //console.log("estoy en createUserReq");
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
    if (res.data.status !== 201) {
     // console.log("entre a la cuestion del error", res.response.data);
      return res.response.data;
    }
    //console.log("esto mado al context de usuario",res.data)
    return res.data;
    
    
  } catch (error) {
   //console.log("que mierda viene aca", error.response.data);
    return error.response.data;
  }
};
//delete
export const deleteUserReq= async(id)=>{
    try {
        const res = await axios.delete(`/users/${id}`)
        //console.log('deleteUserReq',res);
        return res
    } catch (error) {
      return error.response.data;
    }
}
//update
export const updateUserReq=async(id,upUser)=>{
    const form = new FormData();

    try {
        for (let key in upUser){
            form.append(key,upUser[key])
        }
        const res = await axios.put(`/users/${id}`,upUser,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        })
        //console.log('updateUserReq',res.data);
        return res.data     
    } catch (error) {
        //console.log("se rompio en updateUserReq---",error);
        return error.response.data;
    }

}

//forgot password
export const forgotReq=async(email)=>{
  console.log('LLega el email al forgotReq?',email);
  try {
    await axios.post("/users/forgot-password", email);
    
  } catch (error) {
    console.log(error);
  }

}
