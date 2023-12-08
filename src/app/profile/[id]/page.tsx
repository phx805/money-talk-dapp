import Comment from "@/app/components/forms/Comment";
import PostCard from "@/app/components/post/PostCard";
import ProfileHeader from "@/app/components/shared/ProfileHeader";
import { fetchPostById } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


async function page({ params }: { params: { id: string } }) {
    if (!params.id) return null;


    const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  

  const speak = await fetchPostById(params.id)

  return (

    <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        wallet={userInfo.wallet}
      />
  )

}

export default page;