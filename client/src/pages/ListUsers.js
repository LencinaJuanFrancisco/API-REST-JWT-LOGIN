import React from "react";

import { useUsers } from "../context/usersContext";
import IsAuth from   '../component/IsAuth'
import UserCard from "../component/UserCard";

export default function ListUsers() {
  const { users, JWT } = useUsers();

//console.log(JWT);

  if (JWT) {
    return (
      <div className="">
        <div className="my-15 py-15 bg-slate-700">
          <h1 className="text-center text-5xl font-bold text-gray-500 pt-8 ">
            Listado de Usuarios
          </h1>
        </div>

        <div className="columns-5 gap-3  mx-auto space-y-3 p-5 pb-5 bg-slate-700 min-h-[1800px] ">
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>
      </div>
    );
  }else{
    return (
      <div className="h-full bg-slate-500">
        <IsAuth/>

      </div>
  );
}
}
