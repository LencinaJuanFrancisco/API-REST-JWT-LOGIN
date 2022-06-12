import React from "react";

import img from "../img/avataaars.svg";

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg m-1 break-inside-avoid">
      <div className="flex rounded-xl p-1 md:p-0 w-1/4 ">
        <img
          className="h-full md:rounded-none rounded-full"
          src={user.image ? user.image : img}
          
        ></img>
        <div className="p-3 m-auto text-center md:text-left space-y-4">
          {/* <blockquote>
      <p className="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote> */}
          <figcaption className="font-medium p-1 text-center">
            <div className="text-sky-500 dark:text-sky-400"> id - {user.id}</div>
            <div className="text-sky-500 dark:text-sky-400">{user.name}</div>
            <div className="text-slate-700 dark:text-slate-500">
              {user.email}
            </div>
          </figcaption>
          <div className="flex justify-between">
            {
              <button
                className="text-white bg-purple-600 px-3 py-1  rounded-md hover:bg-purple-700"
                // onClick={(e) => {
                //   e.stopPropagation();
                //   handelDelete(post.id, post.title)
                // }}
              >
                Delete
              </button>
            }
            {
              <button
                className="text-white bg-sky-500 px-3 py-1 rounded-md hover:bg-sky-700"
                // onClick={() => navigate(`/editPost/${post.id}`)}
              >
                Edit
              </button>
            }
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
