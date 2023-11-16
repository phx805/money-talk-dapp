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
    <section className="w-[20%] sticky top-0 xl:flex flex-col items-stretch h-screen hidden">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
      {
        NAVIGATOIN_ITEMS.map((item)=>(
        <Link className=" hover:bg-violet-500/50 text-2xl transition-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6" href={`/${item.title.toLowerCase()}`} key={item.title}>
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
      <button className="rounded-full max-w-xs m-2 bg-violet-700 p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">Speak</button>
      </div>
    </section>
  )
}

export default LeftSidebar

