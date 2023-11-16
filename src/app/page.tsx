import LeftSidebar from './components/shared/LeftSidebar';
import Main from './components/shared/Main';
import RigthSidebar from './components/shared/RigthSidebar';




export default function Home() {
  return (
<div className="text-white w-full h-full flex justify-center items-center relative bg-black">
  <div className="max-w-screen-xl w-full h- full flex relative">
    <LeftSidebar />
    <Main/>
    <RigthSidebar/>
      
   
     </div>
    </div>
    )
    }