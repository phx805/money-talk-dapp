import { UserButton,auth} from "@clerk/nextjs"
import Link from 'next/link';


function Header() {
    return (
      <nav className='flex items-center justify-between px-10 py-4 bg-black'>
      <div className='flex items-center'>
      
        <Link href='/'>
          <div className='text-lg font-bold text-white uppercase'>
            Money Talks
          </div>
        </Link>
        
      </div>
      <div className='flex items-center text-white'>
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
            <div className='ml-auto'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </nav>
  );
};
  
  export default Header