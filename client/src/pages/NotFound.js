import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(error) {
  return (

    <div>
      <Link to="/" className="text-gray-300 text-sm hover:text-gray-500 m-15">
            Go Home
      </Link> 
      <Link to="/login" className="text-gray-300 text-sm hover:text-gray-500 m-15">
            Login
      </Link>
      
    
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>NotFound</div>
      

    </div>
  )
}
