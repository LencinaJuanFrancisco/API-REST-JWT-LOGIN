import React from "react";

import toast from "react-hot-toast";
import { useUsers } from "../context/usersContext";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const { deleteUser,logout,userRegister } = useUsers();
  const handelDelete = (id, email) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Realmente quieres eliminar al usuario - <strong>{email}</strong>
          </p>
          <div className="flex justify-around py-2">
            <button
              className="bg-red-600 hover:bg-red-400 px-3 py-2 mx-2 rounded-sm text-white text-sm"
              onClick={() => {
                deleteUser(id);
                //verifico si el usuario que elimino es el que esta logueado, si es correcto, elimono al usuario y lo deslogueo
                if(userRegister.id === id){
                  logout()
                }
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2 text-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
        icon: "🎃",
      }
    );
  };

  return (
    <div className="break-inside-avoid ">
      <div className="m-auto  max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
        <div className="h-24 bg-white"></div>
        <div className="-mt-20 flex justify-center">
          <img className="h-32 rounded-full" src={user.image} />
        </div>
        <div className="mt-5 mb-1 px-3 text-center text-lg">{user.name}</div>
        <div className="mb-5 px-3 text-center text-sky-500">{user.email}</div>
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
