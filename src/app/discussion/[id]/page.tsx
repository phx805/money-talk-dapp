import Comment from "@/app/components/forms/Comment";
import PostCard from "@/app/components/post/PostCard";
import { fetchPostById } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/dashboard");

  const speak = await fetchPostById(params.id);

  return (

    <section className='relative'>
      <div>
        <PostCard
          id={speak._id}
          currentUserId={user.id}
          parentId={speak.parentId}
          content={speak.text}
          author={speak.author}
          createdAt={speak.createdAt}
          comments={speak.children}
        />
      </div>

      <div>
        <Comment />
      </div>

      {/* <div className='mt-10'>
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
      </div> */}
    </section>
  );
}

export default page;