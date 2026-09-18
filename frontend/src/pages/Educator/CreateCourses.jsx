import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CreateCourses = () => {
  const navigate = useNavigate()



  /* Value ko set krna ka liya hama yeha kuch chiza leke aani hogi ... */

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreateCourse = async () => {

    /* ager Data nhi aaya tho ... */
    setLoading(true)

    try {
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true })
      console.log(result.data)
      /* jasa hi Data aa jaye tho ma ese navigate krwa lu ga  */
      navigate("/courses")
      setLoading(false)
      toast.success("Course Created")

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className='min-h-screen flex items-center  justify-center bg-gray-100 px-4 py-10' >
      <div className='max-w-xl w-[600px] m-auto p-6 bg-white shadow-md rounded-md mt-10 relative  ' >
        <FaArrowCircleLeft onClick={() => navigate("/courses")} size={25} className='top-[8%] absolute left-[5%] w-[22px] cursor-pointer' />
        <h2 className='text-2xl font-semibold mb-6 text-center '  >Create Courses</h2>

        {/* Here will we create a Form ... */}
        <form onSubmit={(e) => e.preventDefault()} className='space-y-5'   >

          <div className='flex flex-col gap-2' >
            <label htmlFor="title" className='cursor-pointer' >Courses</label>
            <input id='title' type="text" onChange={(e) => setTitle(e.target.value)} value={title} className=' border-2 border-gray-900 rounded-md px-2  outline-none focus:ring-2   ' placeholder='Enter The Course Title...' />
          </div>


          <div className='flex flex-col gap-2' >
            <label htmlFor="select" className='cursor-pointer' >Courses Category</label>
            <select onChange={(e) => setCategory(e.target.value)} value={category} name="" id="select" className=' border-2 border-gray-900 rounded-md px-2  outline-none focus:ring-2   '  >
              <option value="">Select Category</option>
              <option value="App Development">App Development </option>
              <option value="Ai/Ml">Ai/Ml</option>
              <option value="Ai Tools ">Ai Tools </option>
              <option value="Data Science">Data Science </option>
              <option value=" Data Analytics"> Data Analytics </option>
              <option value="UI/UX Design">UI/UX Design  </option>
              <option value="Web Development"> Web Development </option>
              <option value="Others"> Others  </option>
            </select>
          </div>

          <button disabled={loading} onClick={handleCreateCourse} className='w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition cursor-pointer '>{loading ? <ClipLoader size={30} color='white' /> : "Create"}</button>

        </form>

      </div>
    </div>
  )
}

export default CreateCourses