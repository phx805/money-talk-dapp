import Link from "next/link"
import {BiHomeCircle, BiUser} from 'react-icons/bi'
import {HiOutlineHashtag} from 'react-icons/hi'

const NAVIGATOIN_ITEMS = [
  {
    title:'Home',
    icon:BiHomeCircle
  },
  {
    title:'Explore',
    icon:HiOutlineHashtag
  },
  {
    title:'Profile',
    icon:BiUser
  }
]

function LeftSidebar() {
  return (
    <section className="col-span-2 flex flex-col">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
      {
        NAVIGATOIN_ITEMS.map((item)=>(
        <Link className=" hover:bg-violet-500/50 text-2xl transition-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6" href={
          item.title.toLocaleLowerCase() === "home"
            ? "/"
            : item.title.toLocaleLowerCase() === "profile"
            ? "/profile"
            : `/${item.title.toLowerCase()}`
        }>
          <div>
            <item.icon/>
          </div>
          <div>
            {
              item.title
            }
          </div>

        </Link>
        ))
      }
      <Link href="/speak" 
            className="rounded-full max-w-xs m-2 bg-violet-700 p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">Speak
      </Link>
      </div>
    </section>
  )
}

export default LeftSidebar

