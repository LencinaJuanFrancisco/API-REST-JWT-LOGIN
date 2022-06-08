import React, { createContext,useContext,useState,useEffect } from 'react'
import { loginReq ,getUsersReq} from '../api/users'
const userContext = createContext()

export const useUsers =()=>{
    const context= useContext(userContext)
    return context
}

export const UsersProvider =({children})=>{
    const [usersLogued,setUsersLogued]=useState("")
    const [users,setUsers]=useState([])

    const login=async(userLog)=>{
        //console.log('LOGIN->',userLog);
        const res = await loginReq(userLog)
        //console.log(res.JWT);
        setUsersLogued(res.JWT)
    }
    const getUsers= async()=>{
        const res = await getUsersReq()
        setUsers(res)    
    }
useEffect(()=>{
    getUsers()
},[])

    return(
        <userContext.Provider value={{
            usersLogued,
            setUsersLogued,
            users,
            setUsers,
            getUsers,
            login
        }}>
            {children}
        </userContext.Provider>
    )
}