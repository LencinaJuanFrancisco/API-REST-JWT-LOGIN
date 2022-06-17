import React from "react";
import { Link } from "react-router-dom";
export default function LogAndReg() {
  return (
    <div  className="flex justify-center text-center z-50">
      <Link
        className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
        to="/login"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
      >
        Register
      </Link>
    </div>
  );
}
