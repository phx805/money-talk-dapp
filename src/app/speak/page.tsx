import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { fetchUser } from "@/lib/actions/user.actions";
import Post from "@/app/components/forms/Post";
import SpeakHeader from "../components/shared/SpeakHearer";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
//   if (!userInfo?.onboarded) redirect("/dashboard");

  return (
    
    <>
    <SpeakHeader />
      <h1 className='text-white text-heading2-bold'>Thoughts of the Day...</h1>

      <Post userId={userInfo._id} />
    </>
  );
}

export default Page;
