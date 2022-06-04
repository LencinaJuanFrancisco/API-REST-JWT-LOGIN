import { useState, createContext, useContext } from "react";
import { getPosReq} from '../api/posts'

const postContext = createContext()

export const usePosts=()=>{
    const context = useContext(postContext)
    return context
}

export const PostProvider=({children})=>{
    const [posts, setPosts] = useState([{
        id:1,
        title:"hola mundo",
        body:"sarasa"
    },{
     id:2,
     title:"chau mundo",
     body:"sarasa"
 },{
     id:3,
     title:"otro mundo",
     body:"sarasa"
 }]);

    const getPost= async()=>{
        const res = await getPosReq()
        console.log(res);
        setPosts(res.data)
    }
    return(
        <postContext.Provider value={{
            getPost,posts
        }}>
            {children}
        </postContext.Provider>
    )
}

