import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(error) {
  return (
<div class="h-screen w-screen bg-gray-50 flex items-center">
    <div class="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
            <div class="w-full lg:w-1/2 mx-8">
                <div class="text-7xl text-teal-500 font-dark font-extrabold mb-8"> 404</div>
            <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
                disculpe, recurso no encontrado
            </p>
            
            <a href="/" class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-teal-600 active:bg-red-600 hover:bg-red-700">back to Home</a>
    </div>
        <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
        <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" class="" alt="Page not found"/>
        </div>
    
    </div>
</div>
    // <div>
    //   <Link to="/" className="text-gray-300 text-sm hover:text-gray-500 m-15">
    //         Go Home
    //   </Link> 
    //   <Link to="/login" className="text-gray-300 text-sm hover:text-gray-500 m-15">
    //         Login
    //   </Link>
      
    
    //   <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>NotFound</div>
      

    // </div>
  )
}
