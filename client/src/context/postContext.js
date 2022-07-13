import { useState, createContext, useContext, useEffect } from "react";

import {
  getPosReq,
  deletePostRequest,
  createPostReq,
  updatePostReq,
  getOnePostReq,
} from "../api/posts";

import { useUsers } from "./usersContext";
const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const { setStateError } = useUsers();
  //creamos una funcion para actualizar el estado de todos los posts

  const newState = async () => {
  
    const otraRes = await getPosReq();
    setPosts(otraRes);
    console.log('que se carga aca',otraRes);
  };

  const deletePost = async (id, jwt) => {
    try {
      const res = await deletePostRequest(id, jwt);
      console.log("delepost", res);
      if (res === 200) {
        await newState();
        return res;
      } else {
        setStateError({ error: true, errorMessage: res });
      }
    } catch (err) {
      console.log("🤐 catch deletePost,", err);
      setStateError({ error: true, errorMessage: err.response.data.message });
    }
  };

  const createPost = async (post, jwt) => {
    try {
      const res = await createPostReq(post, jwt);
      if (res === 200) {
        await newState();
        return res;
      } else {
        setStateError({ error: true, errorMessage: res });
      }
    } catch (error) {
      console.log("🤐 catch cretePost,", error);
      setStateError({ error: true, errorMessage: error.response.data.message });
    }
  };

  const updatePost = async (id, post, JWT) => {
    try {
      //console.log('que viene para ser editado',id,post,JWT);
      const res = await updatePostReq(id, post, JWT);
      console.log("update??", res);
      if (res === 200) {
        await newState();
        return res;
      } else {
        setStateError({ error: true, errorMessage: res });
      }
    } catch (err) {
      setStateError({ error: true, errorMessage: err });
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
