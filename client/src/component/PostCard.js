import React from "react";
import { usePosts } from "../context/postContext";
import { useUsers } from "../context/usersContext";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const { deletePost } = usePosts();
  const { JWT } = useUsers();
  // const {usersLogued}=useUsers()
  const navigate = useNavigate();
  //console.log(post.image);
  
  const handelDelete = (id, title) => {
    Swal.fire({
      title: `'Esta seguro de querear eliminar post ${title}?'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `canc`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deletePost(id, JWT);
        Swal.fire('Eliminado!', '', 'success')
      }
    })

  };
  return (
    <div className=" w-60 p-2 m-auto bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-white shadow-sm hover:shadow-2xl break-inside-avoid">
      <img
        className="h-40 object-cover rounded-xl"
        src={post.image}
        alt="generic"
      />

      <div className="p-2 w-60">
        <h2 className="font-bold text-lg mb-2 ">{post.id}</h2>
        <h2 className="font-bold text-lg mb-2 ">{post.title}</h2>
        <p className="mt-4 p-1 w-full text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400 ">
          {post.body}
        </p>
      </div>
      <div className="flex justify-between">
        {JWT && (
          <button
            className="text-white bg-purple-600 px-3 py-1  rounded-md hover:bg-purple-700"
            onClick={(e) => {
               e.stopPropagation();
              handelDelete(post.id, post.title);
            }}
          >
            Delete
          </button>
        )}
        {JWT && (
          <button
            className="text-white bg-sky-500 px-3 py-1 rounded-md hover:bg-sky-700"
            onClick={() => navigate(`/editPost/${post.id}`)}
          >
            Edit
          </button>
        )}
        <div />
      </div>
    </div>
  );
}

export default PostCard;
