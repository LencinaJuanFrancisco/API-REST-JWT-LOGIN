import React from 'react'
import img from "../img/avataaars.svg";
export default function MenuLogued({logout,userLogued}) {
  return (
    <div className="flex justify-around py-1">
   
      <div>
        <button
          onClick={logout}
          className="w-20 m-5 py-2 bg-red-500 shadow-lg shadow-red-500/60 hover:shadow-red-500/30 text-white font-semibold rounded-lg"
        >
          Logout
        </button>
      </div>

   
      <div className="flex justify-end p-5">
        <div>
          <img src={img} alt="" className="w-7 h-7" />
        </div>
        <div>
          <span className="text-gray-200 m-5 py-2 rounded-lg  h-10 ">
            users logued: <strong>{userLogued.email}</strong>
          </span>
        </div>
      </div>

  </div>
  )
}
