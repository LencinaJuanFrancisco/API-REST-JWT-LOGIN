import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useUsers } from "../context/usersContext";
import PostCard from "../component/PostCard";
import ErrorMessage from "../component/ErrorMessage";
import img from "../img/avataaars.svg";

export default function Home() {
  const { posts } = usePosts();
  const { userLogued, JWT, logout } = useUsers();

  const [serach, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
    //console.log(e.target.value);
  };
  //filtrado
  let result = [];

  if (!serach) {
    result = posts;
  } else {
    result = posts.filter((dato) =>
      dato.title.toLowerCase().includes(serach.toLowerCase())
    );
  }

  return (
    <div>
      <div className="flex justify-around py-1">
        {JWT && (
          <div>
            <button
              onClick={logout}
              className="w-20 m-5 py-2 bg-red-500 shadow-lg shadow-red-500/60 hover:shadow-red-500/30 text-white font-semibold rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
        {JWT && userLogued && (
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
        )}
      </div>
      <div className="flex justify-center text-center">
        {!JWT && (
          <Link
            className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
            to="/login"
          >
            Login
          </Link>
        )}

        {!JWT && (
          <Link
            to="/register"
            className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
          >
            Register
          </Link>
        )}

        {JWT && (
          <Link
            to="/newPost"
            className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
          >
            New Post
          </Link>
        )}
        {JWT && (
          <Link
            to="/listUsers"
            className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
          >
            List Users
          </Link>
        )}
      </div>
      <div className="my-5">
        <div className="my-15 py-15 bg-slate-700">
          <div className="flex justify-center text-red-500 text-sm ">
            <ErrorMessage></ErrorMessage>
          </div>
          <h1 className="text-center text-5xl font-bold text-gray-500 py-1">
            Listado de Posts
          </h1>
          <h3 className=" text-center text-xl font-bold text-gray-500  ">
            - cantidad {posts.length} -
            {posts.length === result.length ? (
              <span></span>
            ) : (
              <span> encontrados {result.length}</span>
            )}
          </h3>
        </div>
        <div className="text-center">
          <input
            value={serach}
            onChange={searcher}
            type="text"
            placeholder="Search"
            className="text-center text-white rounded-lg  bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
          />
        </div>

        <div className="columns-4 gap-3 w-[1200px] mx-auto space-y-3 p-5 pb-5 bg-slate-700 min-h-[1800px] ">
          {result.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
