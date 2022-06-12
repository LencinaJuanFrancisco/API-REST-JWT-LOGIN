
import React from 'react'
import {Link} from 'react-router-dom'
import { useUsers } from '../context/usersContext'

import UserCard from '../component/UserCard'




  
  
export default function ListUsers() {
    const {users}=useUsers()
   
    const data=users;
   // console.log('listUsers',data);
  return (
    <div className=''>
        <div className='pt-5 float-right mx-5'>
        <Link
            to="/"
            className="text-gray-300 text-sm hover:text-gray-500 flex justify-end"
          >
            Go Home
          </Link>
        </div>
        <div className='my-15 py-15 bg-slate-700'>
            <h1 className='text-center text-5xl font-bold text-gray-500 pt-8 '>Listado de Usuarios</h1>
        </div>
       
        <div className="columns-4 gap-3 w-[1200px] mx-auto space-y-3 p-5 pb-5 bg-slate-700 min-h-[1800px] ">
       {users.map((user)=>(
          <UserCard user={user} key={user.id}/>
       ))}

        </div>
    </div>
  )
}
