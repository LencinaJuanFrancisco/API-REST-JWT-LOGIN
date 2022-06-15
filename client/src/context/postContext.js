import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPosReq,
  deletePostRequest,
  createPostReq,
  updatePostReq,
  getOnePostReq,
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  //creamos una funcion para actualizar el estado de todos los posts

  const newState = async () => {
    const otraRes = await getPosReq();
    setPosts(otraRes);
  };

  const deletePost = async (id) => {
    try {
      await deletePostRequest(id);
      await newState();
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (post,jwt) => {
    try {
     const res = await createPostReq(post,jwt);
      if(res.status === 200){
        await newState()
        return res.status
      }else{
        return res.response.data
      }  
     
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, post, JWT) => {
    try {
      const res =  await updatePostReq(id, post, JWT);
      //console.log('esto en en el contex',res.response.data);
      if(res.status === 200){
        await newState()
        return res.status
      }else{
        return res.response.data
      }  
                         
      
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    const res = await getOnePostReq(id);
    return res;
  };

  useEffect(() => {
    (async () => {
      await newState();
    })();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        setPosts,
        deletePost,
        createPost,
        updatePost,
        getPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
