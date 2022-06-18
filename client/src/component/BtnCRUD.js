import React from "react";
import {Link} from 'react-router-dom'
export default function BtnCRUD() {
  return (
    <div className="flex justify-center text-center">
      <Link
        to="/newPost"
        className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
      >
        New Post
      </Link>

      <Link
        to="/listUsers"
        className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
      >
        List Users
      </Link>
    </div>
  );
}
