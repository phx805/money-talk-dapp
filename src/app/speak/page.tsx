import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { fetchUser } from "@/lib/actions/user.actions";
import Post from "@/app/components/forms/Post";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
//   if (!userInfo?.onboarded) redirect("/dashboard");

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <Post userId={userInfo._id} />
    </>
  );
}

export default Page;
