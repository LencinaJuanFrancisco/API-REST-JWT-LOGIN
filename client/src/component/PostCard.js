import React from "react";
import {usePosts} from '../context/postContext'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const image =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handelDelete = (id, title) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Realmente quieres eliminar el post - <strong>{title}</strong>
          </p>
          <div className="flex justify-around py-2">
            <button
              className="bg-red-600 hover:bg-red-400 px-3 py-2 mx-2 rounded-sm text-white text-sm"
              onClick={() => {
                deletePost(id);
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
    <div
      className=" w-60 p-2 m-auto bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-white shadow-sm hover:shadow-2xl break-inside-avoid"
    
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <img className="h-40 object-cover rounded-xl" src={image} />
      <div className="p-2 w-60">
        <h2 className="font-bold text-lg mb-2 ">{post.title}</h2>
        <h2 className="font-bold text-lg mb-2 ">{post.id}</h2>
        <p className="mt-4 p-1 w-full text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400 ">{post.body}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="text-white bg-purple-600 px-3 py-1  rounded-md hover:bg-purple-700"
          onClick={(e) => {
            e.stopPropagation();
            handelDelete(post.id, post.title)
          }}
        >
          Delete
        </button>
        <button
          className="text-white bg-sky-500 px-3 py-1 rounded-md hover:bg-sky-700"
          onClick={(e) => {
            e.stopPropagation();
            // handelDelete(post._id, post.title)
          }}
        >
          Edit
        </button>
        <div />
      </div>
    </div>
  );
}

export default PostCard;
