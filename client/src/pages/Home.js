import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useUsers } from "../context/usersContext";
import PostCard from "../component/PostCard";

export default function Home() {
  const { posts } = usePosts();
  const { usersLogued,setUsersLogued } = useUsers();
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
  const logout=()=>{
    setUsersLogued(usersLogued.status=400)
  }

  return (
    <div>
      <div className="flex justify-around ">
        <div>
        {usersLogued && (
          <button onClick={logout} className="w-20 m-5 py-2 bg-red-500 shadow-lg shadow-red-500/60 hover:shadow-red-500/30 text-white font-semibold rounded-lg">Logout</button>
        )}
        </div>
        <div className="">
        {usersLogued && (
          <span className="text-teal-500 m-5 py-2 rounded-lg p-1 h-10 ">
            users logued: {usersLogued.userName}
          </span>
        )}
        </div>
        
      </div>
      <div className="flex justify-center text-center">
        
          {!usersLogued && (
            <Link
              className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              to="/login"
            >
              Login
            </Link>
          )}
        
       
            {!usersLogued && <Link
          to="/register"
          className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
        >
          Register
        </Link>}
        
        
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
      <div className="my-5">
        <div className="my-15 py-15 bg-slate-700">
          <h1 className="text-center text-5xl font-bold text-gray-500 py-1">
            Listado de Posts{" "}
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
