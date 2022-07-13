import React from "react";
import PostCard from "./PostCard";
import { usePosts } from "../context/postContext";

export default function HomePosts() {
  const { posts } = usePosts();
  return (
    <div className="container px-6 py-10 mx-auto">
      <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
        Nuestros Posts
      </h1>

      <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
        ex placeat modi magni quia error alias, adipisci rem similique, at omnis
        eligendi optio eos harum.
      </p>
      < div className="columns-4 gap-3 w-[1200px] mx-auto space-y-3 p-5 pb-5 bg-slate-800 min-h-[1800px] ">
        { posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div> 
    </div>
  );
}
