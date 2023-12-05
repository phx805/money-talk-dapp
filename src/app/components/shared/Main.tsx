import { BsDot, BsChat } from 'react-icons/bs';
import { AiOutlineRetweet, AiOutlineHeart} from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';


function Main() {
  return (
     <div>
         <main className="p-2 flex w-full max-w-2xl h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-lime-100">
      <h1 className="text-2xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">Home</h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-lime-100 h-32 relative">
        <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
        <div className="flex flex-col w-full h-full">
            <input type="text" className="w-full h-full text-2xl px-4 mt-6 bg-transparent border-b-[0.5px] border-lime-100 outline-none border-none"placeholder="Discussion?" />
          </div>
          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full mt-6 max-w-[100px]">
              <button className="rounded-full bg-violet-700 px-4 py-2 w-full text-lg text-center hover:border-opacity-70 trastion duration-200 font-bold">Speak</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {
            Array.from({length:5}).map((_,i)=>(
              <div key={i} className="border-b-[0.5px] border-lime-100 p-4 flex space-x-4">
                <div>
                  <div className="w-10 h-10 bg-slate-200 rounder-full"/>
                  
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-1">
                    <div className="font-bold">Speaker</div>
                    <div className="text-gray-400">@speaker</div>
                      <div className="text-gray-400">
                        <BsDot/>
                    </div>
                    <div className="text-gray-400">1 hour ago</div>
                  </div>
                  <div className="text-white text-lg">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum aliquid esse commodi, architecto accusantium dolores, excepturi fugit quos aut illo molestiae perspiciatis culpa asperiores nemo totam, quo molestias numquam pariatur velit placeat corporis?
                  </div>
                  <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl mt-2">

                  </div>
                  <div className="flex items-center justify-start space-x-24 mt-4 w-full">
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <BsChat/>
                    </div>
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <AiOutlineRetweet/>
                    </div>
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <AiOutlineHeart/>
                    </div>
                    <div className="rounded-full hover:bg-violet-500/50 transtion duration-200 p-3 cursor-pointer">
                      <IoShareOutline/>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
    </main>
      
    </div>
  )
}

export default Main
