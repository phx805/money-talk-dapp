import { fetchPosts } from '@/lib/actions/post.actions';
import PostCard from "@/app/components/post/PostCard";
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';



async function Main() {
  const result = await fetchPosts(1, 30);
  const user = currentUser();
  if (!user) return null;


  
  return (
     <div className="col-span-6">
         <section className="p-2 flex w-full max-w-2xl h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-lime-100">
      <h1 className="text-2xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">Home</h1>
      <div className="border-t-[0.5px] px-4 flex items-stretch space-x-2 border-lime-100 relative">
        {/* <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div> */}
        {/* <div className="flex flex-col w-full h-full">
            <input type="text" className="w-full h-full text-2xl px-4 mt-6 bg-transparent border-b-[0.5px] border-lime-100 outline-none border-none"placeholder="Discussion?" />
          </div> */}
          <div className="w-full justify-between items-center flex">
            <div></div>
            {/* <div className="w-full mt-6 max-w-[100px]">
              <button className="rounded-full bg-violet-700 px-4 py-2 w-full text-lg text-center hover:border-opacity-70 trastion duration-200 font-bold">Speak</button>
            </div> */}
          </div>
        </div>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
        
    </section>
      
    </div>
  )
}

export default Main
