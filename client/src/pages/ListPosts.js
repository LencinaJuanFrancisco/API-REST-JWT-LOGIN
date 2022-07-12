import React, { useState } from "react";

import { usePosts } from "../context/postContext";
import { useUsers } from "../context/usersContext";
import PostCard from "../component/PostCard";
import HandelError from "../component/HandelEerror";
import IsAuth from "../component/IsAuth";

export default function ListPosts() {
  const { posts } = usePosts();
  const { logout, errorMessage, setStateError, errorValue, JWT } = useUsers();

  const [serach, setSearch] = useState("");

  const runSetTime = () => {
    logout();
    setStateError({ error: false, errorMessage: " " });
  };
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
  if (JWT) {
    return (
      <div>
        <div className="my-5">
          <div className="my-15 py-15 bg-slate-700">
            <div className="flex justify-center text-red-500 text-sm "></div>
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
          {errorValue && (
            <div className="flex justify-center my-4 py-2">
              <HandelError err={errorMessage} />
              {runSetTime()}
            </div>
          )}
          {<div className="lg:columns-4 md:columns-3  sm:columns-1 gap-1  mx-auto space-y-3 p-5 pb-5 bg-slate-700 min-h-[1800px] ">
            {result.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>}
        </div>
      </div>
    );
  } else {
    return <IsAuth />;
  }
}
