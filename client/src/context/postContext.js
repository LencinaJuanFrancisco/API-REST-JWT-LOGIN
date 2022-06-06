import { useState, createContext, useContext, useEffect } from "react";
import { getPosReq, deletePostRequest, createPostReq } from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const res = await getPosReq();
    //console.log(res);
    setPosts(res.data);
  };
  const deletePost = async (id) => {
    try {
      await deletePostRequest(id);
      //buscamos el post para actualizar el estado
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const createPost = async (post) => {
    console.log('esto es el createPost',post);
    try {
        
        const res = await createPostReq(post);
        console.log("create post", res.data);
        setPosts([...posts, res.data]);
    } catch (error) {
        console.log(error);
    }
  };
  

  useEffect(() => {
    getPost();
  }, []);
  return (
    <postContext.Provider
      value={{
        getPost,
        posts,
        setPosts,
        deletePost,
        createPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
