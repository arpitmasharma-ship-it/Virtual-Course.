import React from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user) /* Yeha user slice se hamera paas data aa jayega . */
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'  >
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'  >
        <FaArrowCircleLeft size={30} color='black' className='cursor-pointer' onClick={()=>navigate("/")} />

        {/* Photo Url And Name Information.  */}
        <div className='flex flex-col items-center text-center '  >
          {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black ' alt="" />
            : <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          }
          <h2 className='text-2xl font-bold mt-4 text-gray-800' >{userData.name}</h2>
          <p className='text-sm  mt-2 text-gray-500' >{userData.role}</p>

        </div>


        {/* information  */}
        <div className='mt-6 space-y-4' >
          <div className='flex gap-2 items-center justify-center'>
            <span className='font-bold text-gray-700' >Email : </span>
            <span className='text-gray-600'  >{userData.email}</span>
          </div>

          <div className='flex gap-2 items-center justify-center'>
            <span className='font-bold text-gray-700' >Bio : </span>
            <span className='text-gray-600'  >{userData.description}</span>
          </div>

          <div className='flex gap-2 items-center justify-center'>
            <span className='font-bold text-gray-700' >Enrolled Courses : </span>
            <span className='text-gray-600'  >{userData.enrolledCourses.length}</span>
          </div>
        </div>


        {/* Button */}
        <div className='flex items-center justify-center mt-5' >
          <button onClick={()=>navigate("/editprofile")} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gray-900 to-black text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer"  >Edit Profile</button>
        </div>


      </div>
    </div>
  )
}

export default Profile
