import React from 'react'
import { TbDeviceDesktopFilled } from "react-icons/tb";
import { GrTurbolinux } from "react-icons/gr";
import { FaAppStore } from "react-icons/fa";
import { SiHackster } from "react-icons/si";
import { GrSnapchat } from "react-icons/gr";
import { GiMaterialsScience } from "react-icons/gi";
import { IoMdAnalytics } from "react-icons/io";
import { FaBrain } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const ExploreCourses = () => {
    const navigate = useNavigate()
    return (
        /*  w-[100vw] ===============>>>>>>>>>>>>> Element ki width screen/browser ki total width ke 100% ke barabar hogi. */
        <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
            {/* left/top */}
            <div
                className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] 
             flex flex-col items-start justify-center gap-1 
             md:px-[40px] px-[20px]"
            >

                <span className='text-[35px] font-semibold'>Explore</span>
                <span className='text-[35px] font-semibold'>Our Courses</span>

                <p className='text-[17px]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rem vel iure explicabo laboriosam accusantium expedita laudantium facere magnam.
                </p>

                <button  onClick={()=>navigate("/allcourses")} className=' cursor-pointer px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px]'>
                    Explore Courses
                </button>

            </div>


            {/* right/bottom */}
            <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>

                {/* One Sample div for the cards and We will reuse these again and again */}
                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <TbDeviceDesktopFilled size={30} color='black' />
                    </div>
                    Web Development
                </div>

                {/* 2 */}

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <GrTurbolinux size={30} color='black' />
                    </div>
                    Ui/Ux Designing
                </div>

                {/* 3 */}

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <FaAppStore size={30} color='black' />
                    </div>
                    App Development
                </div>



                {/* 4 */}

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <SiHackster size={30} color='black' />
                    </div>
                    Ethical Hacking
                </div>

                {/* 5 */}

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <GrSnapchat size={30} color='black' />
                    </div>
                    Ai/Ml
                </div>



                {/* 6 */}

                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <GiMaterialsScience size={30} color='black' />
                    </div>
                    Data Science
                </div>

                {/* 7 */}
                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <IoMdAnalytics size={30} color='black' />
                    </div>
                    Data Analytics
                </div>



                {/* 8 */}
                <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
                    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
                        <FaBrain size={30} color='black' />
                    </div>
                    Ai tools
                </div>



            </div>


        </div>

    )
}

export default ExploreCourses