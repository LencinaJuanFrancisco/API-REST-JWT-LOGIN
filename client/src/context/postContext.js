import { useState, createContext, useContext, useEffect } from "react";
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

  // const getPosts = async () => {
  //   const res = await getPosReq();
  //   //console.log(res);
  //   setPosts(res.data);
  // };


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
    console.log("esto es el createPost", post);
    try {
      const res = await createPostReq(post);
      console.log("create post", res.data);
      setPosts([...posts, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, post) => {
   const res =  await updatePostReq(id, post);
    console.log("updatePost--->😎",res);
    //para que se actualize el listado de los post en el home, debemos modificar el estado, al igual que cuando eliminamos o creamos
    setPosts(posts.map(item => {
      if(item.id === id){
        item = res.data
        
      }
      return item
    }))
  
    // updatePostReq(id,post)
    // getPosReq(setPosts)
      
  
    console.log("despues del setPost 😣", posts);
  };


  const getPost = async (id) => {
    const res = await getOnePostReq(id);
    console.log("getPost->", res);
    return res;
  };


 useEffect(()=>{
   getPosReq(setPosts)
 },[])


  // useEffect(() => {
  //   (async () => {
  //     const res = await getPosReq();
  //     setPosts(res.data);
  //   })();
  // }, []);

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
