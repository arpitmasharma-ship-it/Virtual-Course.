import React from 'react'
import Navbar from '../component/Navbar'
import home1 from "../assets/home1.jpg"
import { IoPlayOutline } from "react-icons/io5";
import aiimg from "../assets/ai.png"
import aiimg2 from "../assets/SearchAi.png"
import Logos from '../component/Logos.jsx';
import codex from "../assets/Codex.png"
import ExploreCourses from "../component/ExploreCourses.jsx"
import CardPage from '../component/CardPage.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='w-[100%] overflow-hidden   '   >
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative  '  > {/* relative    here this is very important . */}
        <Navbar />
        <img src={codex} alt="" className='mb-3 object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh] ' />
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>
          Grow Your Skills to Advance
        </span>

        <span className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold'>
          Your Career path
        </span>

        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap'>
          {/* flex-wrap   =============>>>>>>>>>>>>>>>> Mtlb jo hai usse upper niche kr do  */}
          <button  onClick={()=>navigate("/allcourses")} className='cursor-pointer hover:scale-110 hover:bg-black hover:text-white  px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer'>
            View All Courses <IoPlayOutline className='w-[30px] h-[30px] lg:fill-white fill-black' />
          </button>

          <button className='px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center'>
            Search With Ai <img src={aiimg} className='w-[30px] h-[30px] rounded-full hidden lg:block ' />
            <img src={aiimg2} className='w-[30px] h-[30px] rounded-full  lg:hidden  ' alt="" />

            {/* Imp to keep in Mind 
            lg:block => means li lg ma show krwana hai .
             lg:hidden => means ki lg ma hide krwana hai . */}
          </button>

        </div>




      </div>
      <Logos />
      <ExploreCourses />
      <CardPage />
    </div>
  )
}

export default Home