import React from 'react'
import { Link } from 'react-router-dom'
import {usePosts} from '../context/postContext'
import PostCard from '../component/PostCard'


export default function Home() {
  const {posts}=usePosts()
  // console.log(posts);
  return (
    <div>
        <div className='flex justify-end text-center'>
        <Link to="/login" className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">Login</Link>
        <Link to="/register" className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">Register</Link>
        <Link to="/newPost" className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">New Post</Link>
        <Link to="/listUsers" className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">List Users</Link>
        </div>
        <div className='my-5'>
        <div className='my-15 py-15 bg-slate-700'>
            <h1 className='text-center text-5xl font-bold text-gray-500 pt-8 pb-5'>Listado de Posts</h1>
        </div>
        <div className="columns-4 gap-3 w-[1200px] mx-auto space-y-3 p-5 pb-5 bg-slate-700 f">
          {posts.map((post) => (
            <PostCard key={post.id} post={post}  />
          ))}
        </div>

        </div>
    </div>
  )
}
