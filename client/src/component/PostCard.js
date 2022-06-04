import React from 'react'
//import {usePost} from '../context/postContext'
import {useNavigate} from 'react-router-dom'

function PostCard({post}) {
    const navigate = useNavigate()
  return (
    <div
    className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer "
    onClick={() => navigate(`/posts/${post._id}`)}
  >
    <div className="px-4 py-7">
      <div className="flex justify-between">
        <h3 className="text-blue-500">{post.title}</h3>
        <button
          className="bg-red-700 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
          onClick={(e) => {
            e.stopPropagation()
            // handelDelete(post._id, post.title)
          }
          }
        >
          Delete
        </button>
      </div>
      <p className="text-blue-300">{post.description}</p>
    </div>
      {post.image && <img src={post.image.url} className="w-full h-96 object-cover"/>}
  </div>
  )
}

export default PostCard