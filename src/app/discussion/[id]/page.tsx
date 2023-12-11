import Comment from "@/app/components/forms/Comment";
import PostCard from "@/app/components/post/PostCard";
import SpeakHeader from "@/app/components/shared/SpeakHearer";
import { fetchPostById } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
    if (!params.id) return null;


    const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  
  

  const speak = await fetchPostById(params.id)
  console.log(speak.author);
  
  return (

    

    <section className="relitive rounded-2xl bg-black text-white">
      <SpeakHeader/>
      <div className="bg-neutral-800 rounded-2xl">
      <PostCard
                key={speak._id}
                id={speak._id}
                currentUserId={user.id}
                parentId={speak.parentId}
                content={speak.text}
                author={speak.author}
                createdAt={speak.createdAt}
                comments={speak.children}
              />
      </div>

      <div className="bg-black">
      <Comment
          postId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
          wallet= {speak.author.wallet}
        />
      </div>

      <div className='mt-10 bg-black'>
        {speak.children.map((childItem: any) => (
          <PostCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;