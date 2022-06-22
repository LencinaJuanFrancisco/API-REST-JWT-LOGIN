import React from "react";
import Swal from "sweetalert2";
export default function IsAuth() {
  return (
    <div className="h-full bg-slate-500">
      {Swal.fire({
        title: "Debes loguearte para poder tener acceso",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '<a href="/login">Login</a>',
        denyButtonText: '<a href="/register">Register</a>',
        cancelButtonText: '<a href="/">Home</a>',
        allowOutsideClick: false
      })}
    </div>
  );
}
