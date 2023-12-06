import AccountProfile from '@/app/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';

async function page() {
  const user = await currentUser();
  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    userName: userInfo?.username || user?. username,
    wallet: userInfo?.wallet || "",
    image: userInfo?.image || user?.imageUrl,

  }
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