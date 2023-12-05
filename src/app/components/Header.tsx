import { UserButton, auth} from "@clerk/nextjs"
import Link from 'next/link';
import { FaDollarSign } from "react-icons/fa6";



function Header() {

  const { userId } = auth ();
    console.log(userId);
    return (
      <nav className='flex items-center justify-between px-10 py-4 bg-neutral-900'>
      <div className='flex items-center'>
      
        <Link href='/'>
          <div className='text-lg font-bold text-white uppercase flex items-center'>
            Money Talk<FaDollarSign />
          </div>

        </Link>
        
      </div>
      <div className='flex items-center text-white'>
      {!userId && (
        <>
        <Link
              href='sign-in'
              className='text-gray-300 hover:text-white mr-4'
            >
              Sign In
            </Link>

            <Link
              href='sign-up'
              className='text-gray-300 hover:text-white mr-4'
            >
              Sign Up
            </Link>
        </>
      )}
            
            <div className='ml-auto'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </nav>
  );
};
  
  export default Header