import React from "react";

import Swal from "sweetalert2";

import { useUsers } from "../context/usersContext";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const { deleteUser,logout,userRegister } = useUsers();
  const handelDelete = (id, email) => {

    Swal.fire({
      title: `'Esta seguro de querear eliminar el usuario ${email}?'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `canc`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteUser(id);
       // verifico si el usuario que elimino es el que esta logueado, si es correcto, elimino al usuario y lo deslogueo
                if(userRegister.id === id){
                  logout()
        Swal.fire('Eliminado!', '', 'success')
      }
    }
    })
 
  };

  return (
    <div className="break-inside-avoid ">
      <div className="m-auto  max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
        <div className="h-24 bg-white"></div>
        <div className="-mt-20 flex justify-center">
          <img className="bject-cover w-32 h-32 rounded-full ring-4 ring-teal-500" src={user.image} />
        </div>
        <div className="mt-5 mb-1 px-3 text-center text-lg">{user.name}</div>
        <div className="mb-5 px-3 text-center text-teal-500">{user.email}</div>
        <blockquote>
          <p className="mx-2 mb-5 text-center text-base">id - {user.id}</p>
        </blockquote>
      <div className="flex justify-center mb-2">
        {
          <button
            className="text-white bg-purple-600 px-3 py-1 m-1  rounded-md hover:bg-purple-700"
            onClick={(e) => {
              e.stopPropagation();
              handelDelete(user.id, user.email);
            }}
          >
            Delete
          </button>
        }
        {
          <button
            className="text-white bg-sky-500 px-3 py-1 w-1/4 m-1 rounded-md hover:bg-sky-700"
            onClick={() => navigate(`/editUser/${user.id}`)}
          >
            Edit
          </button>
        }
      </div>
      </div>
    </div>
  );
}
