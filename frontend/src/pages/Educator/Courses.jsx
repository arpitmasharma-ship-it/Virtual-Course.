import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';


const Courses = () => {
    const navigate = useNavigate()
    /* Now jo bhi hamena data set kiya hai usse hama map krwana hai ... */
    const { creatorCourseData } = useSelector(state => state.course)
    console.log("Courses:", creatorCourseData);
    console.log("Length:", creatorCourseData?.length);
    return (
        <div className='flex  min-h-screen'  >

            <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100 '  >

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>


                    <div className='flex items-center justify-center gap-3'>

                        <FaArrowCircleLeft onClick={() => navigate("/dashboard")
                        } className='w-[22px] h-[22px] text-black cursor-pointer ' />
                        <h1 className='font-semibold text-2xl' >All Created Courses</h1>

                    </div>

                    <button onClick={() => navigate("/createcourse")} className='border-2 rounded-md text-gary-300 p-2 hover:text-white hover:bg-black hover:transition-all hover:scale-115 cursor-pointer duration-500'  >Create Course</button>
                </div>



                {/* For Large Screen  */}
                <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'  >
                    {/* Table ... */}
                    <table className='min-w-full text-sm '   >
                        {/* thead ka matlab Table Head. */}
                        <thead className='border-b bg-gray-50'  >
                            {/* th => Ye table ke column ka heading/name define karta hai. */}
                            <th className='text-left py-3 px-4'    >Courses</th>
                            <th className='text-left py-3 px-4'    >Prices</th>
                            <th className='text-left py-3 px-4'    >Status</th>
                            <th className='text-left py-3 px-4'    >Action</th>
                        </thead>

                        {/* <tbody> ka matlab hai Table Body. */}
                        {/* Ye table ka main data section hai. */}
                        {/* td = Table Data */}
                        {/* tr = Table Row */}
                        <tbody>
                            {/* YEHA MUHJE "creatorCourseData" KO MAP KRWANA HAI ... */}
                            {creatorCourseData?.map((course, index) => (


                                /* jitna mera paas index honge utna mera tr ban jayenga ... */
                                <tr key={index} className='border-b hover-border-gray-50 transition duration-200' >

                                    <td className='py-3 px-4 flex items-ceter gap-4 ' >
                                        {course?.thumbnail ? <img src={course?.thumbnail} alt="" className='w-25 h-14 object-cover rounded--md object-cover   ' /> : <img src={img} alt="" className='w-25 h-14 object-cover rounded--md object-cover   ' />} <span>{course?.title}</span>
                                    </td>
                                    {course?.price ? <td className='px-4 py-3 '  >₹ {course?.price}</td> :
                                        <td className='px-4 py-3 '  >₹ NA </td>}
                                    <td className='px-4 py-3 '   ><span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? "bg-green-100 text-green-600 " : "bg-red-100 text-red-600"}`}  >{course.isPublished ? "Public" : "Draft"}</span></td>
                                    <td className='px-4 py-3 '   ><FaEdit onClick={() => navigate(`/editcourse/${course._id}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' size={25} /></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>


                    <p className='text-center text-sm text-gray-400 mt-6'  >A list of Ur Recent Courses ...</p>
                </div>


                {/* flex-1 = "Bhai, jitni bachi hui jagah hai mujhe de de." 😄 */}
                {/* Agar parent ki width 1000px hai:
- Left → 80px
- Right → 80px
- Middle → flex-1 → remaining 840px */}

                {/* For Small Screen  */}
                <div className='md:hidden block space-y-4'  >
                    {creatorCourseData?.map((course, index) => (
                        <div key={index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'   >


                            <div className='flex gap-4 items-center  '  >
                                {course?.thumbnail ? <img src={course?.thumbnail} alt="" className='w-16 h-16 rounded-md object-cover ' /> : <img src={img} alt="" className='w-16 h-16 rounded-md object-cover ' />}

                                <div className='flex-1' > {/* yeha flex-1 ka kamal hai  */}
                                    <h2 className='font-medium text-sm '  >{course.title} </h2>
                                    {course?.price ? <p className='text-gray-600 text-xs mt-1' >₹ {course?.price}</p> :
                                        <p className='text-gray-600 text-xs mt-1' >₹ NA</p>}
                                </div>
                                <FaEdit onClick={() => navigate(`/editcourse/${course._id}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' size={25} />
                            </div>

                            <span className={`'w-fit px-3 py-1 text-xs rounded-full${course.isPublished ? "bg-green-100 text-green-600 " : "bg-red-100 text-red-600"}`} >Draft</span>


                        </div>
                    ))}
                    <p className='text-center text-sm text-gray-400 mt-4 ' >A list of Ur Recent Courses ...</p>
                </div>

            </div>

        </div>
    )
}

export default Courses







/* Class	Meaning
w-full	Parent ki 100% width
w-fit	Content ke according jitni zarurat ho utni width
w-screen	Puri viewport ki width
w-auto	Browser/default auto sizing */