import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../component/Card';

function AllCourses() {
    const navigate = useNavigate()
    const { courseData } = useSelector(state => state.course)

    const [category, setCategory] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]); /* Iska purpose likely filtered courses ko store karna hai. */

    /* for mobile ui  */
    const [isSlidebarVisible, setIsSlidebarVisible] = useState(false)

    /* Ye function tab chalega jab checkbox/category ko click karoge.
e = event object. */
    /* e.target.value
    se clicked checkbox ki value milegi. */

    const toggleCategory = (e) => {
        /* includes() check karta hai ki category already selected hai ya nahi. */
        if (category.includes(e.target.value)) {

            /* Agar already selected hai → remove karo ye reomve ka logic  */
            /* Suppose:
prev = ["Frontend", "Backend", "AI"]
User "Backend" ko unselect karta hai.
prev.filter((c) => c !== "Backend")
Result:
["Frontend", "AI"]
So Backend remove ho gaya. */
            setCategory((prev) => prev.filter((c) => c !== e.target.value));
        } else {
            /*  Agar selected nahi hai → add karo */
            /* Suppose:
prev = ["Frontend", "AI"]
User "Backend" select karta hai.
[...prev, "Backend"]
Result:
["Frontend", "AI", "Backend"] */
            setCategory((prev) => [...prev, e.target.value]);
        }
    };






    /* AB Hama Yeha Filter ko apply krna hai ... */
    const applyFilter = () => {
        let courseCopy = courseData?.slice()  /* slice se ham  copy bana saktha hai  */
        if (category.length > 0) {
            /* courseCopy ko filter  krna hai ... */
            /* hamena c yeha ek index ki tarah use kiya jo array ke hr course pe jayega ... */
            courseCopy = courseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourses(courseCopy)
    }


    useEffect(() => {
        setFilterCourses(courseData)
    }, [courseData])

    useEffect(() => {
        applyFilter()
    }, [category])

    return (
        <div className='flex min-h-screen bg-gray-50'   >
            <Navbar />

            <button onClick={() => setIsSlidebarVisible(prev => !prev)}
                className=' cursor-pointer fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black'>
                {isSlidebarVisible ? "Hide" : "Show"}
            </button>


            {/* Side Bar  */}
            <aside className={`   w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] 
             border-r border-gray-200
             shadow-md transition-transform duration-300 z-5   ${isSlidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block  md:translate-x-0 `}>
                {/* Error ye tha ki mena yeha md : translate-x-0  yeha mena space de diya tha ...    */}

                <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6 '>
                    <FaArrowCircleLeft onClick={() => navigate("/")} className='cursor-pointer text-white' />
                    Filter by Category
                </h2>
                <form onSubmit={(e) => e.preventDefault()}
                    action=""
                    className="space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl"
                >


                    <button
                        className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <img src={ai} alt="" className='w-[30px] h-[30px] rounded-full ' />
                        Search with Ai
                    </button>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'App Development'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        App Development
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Ai/Ml'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Ai/Ml
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Ai Tools'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Ai Tools
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Data Science'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Data Science
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Data Analytics'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Data Analytics
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Ethical Hacking '} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Ethical Hacking
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Ui/Ux Designining'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Ui/Ux Designining
                    </label>


                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Web Development'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Web Development
                    </label>

                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input value={'Others'} onChange={toggleCategory} type="checkbox" className='accent-black w-4 h-4 rounded-md' />
                        Others
                    </label>


                </form>


            </aside>


            {/* Main */}

            <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
                {
                    filterCourses?.map((course, index) => (
                        <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} />
                    ))
                }
            </main>


        </div>
    )
}

export default AllCourses
