import AccountProfile from '@/app/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    wallet: userInfo ? userInfo?.wallet : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>create your account</p>
      <section className="mt-9 bg-neutral-900 p-10">
        <AccountProfile user={userData} btnTitle="Continue"/>

      </section>
    </div>
  )
}

export default page