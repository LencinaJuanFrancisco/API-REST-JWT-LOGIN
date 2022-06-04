import React from 'react'
import { Link } from 'react-router-dom'
import {usePosts} from '../context/postContext'
import PostCard from '../component/PostCard'


export default function Home() {
  const {posts}=usePosts()
  console.log(posts);
  return (
    <div>
        <div className='flex justify-end text-center'>
        <Link to="/login" className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">Login</Link>
        <Link to="/newPost" className="w-20 m-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">New Post</Link>
        </div>
        <div>
            <h1>Listado de Posts</h1>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
    </div>
  )
}
