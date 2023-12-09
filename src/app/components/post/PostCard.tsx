import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string;
    content: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
    createdAt: string;
    comments: {
      author: {
        image: string;
      };
    }[];
    isComment?: boolean;
  }
  
  const PostCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    createdAt,
    comments,
    isComment,
  }: Props) => {
    return (
      <article
      className={`flex w-full flex-col border-b-[0.5px] rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
    
          <div className="flex flex-row items-start py-4 gap-4 justify-center ">
      
      <Link href={`/profile/${author.id}`} className='relative h-[50px] w-[50px]'>
        <Image
          src={author.image}
          alt='user_community_image'
          fill
          className='cursor-pointer rounded-full'
        />
      </Link>
      <div className="flex w-full flex-row">
        <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className="mt-2 cursor-pointer text-base-semibold text-white">
                {author.name}
              </h4>
            </Link>
        </div>
      </div>

      <p className="ml-10 text-small-regular text-light-2 flex">{content}</p>

      <div className="flex items-center justify-start space-x-24 mt-4 w-full">
                    
      <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                    <Link href={`/discussion/${id}`}>
                      <BsChat/>
                    </Link>
                    </div>
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <Link href="/">
                      <AiOutlineRetweet/>
                      </Link>
                    </div>
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <AiOutlineHeart/>
                    </div>
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <IoShareOutline/>
                    </div>
                    </div>
                    
                    {isComment && comments.length > 0 && (
                <Link href={`/discussion/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
                
              )}

   
    
    
      </article>
      

    )
  }

    export default PostCard;