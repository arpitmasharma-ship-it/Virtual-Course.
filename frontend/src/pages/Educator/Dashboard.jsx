import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft } from "react-icons/fa";

const Dashboard = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className="flex min-h-screen bg-gray-red">
            <FaArrowCircleLeft size={30} color='black' className='cursor-pointer mt-5 ml-5 bg-gray-50' onClick={() => navigate("/")} />
            <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
                {/* main section */}

                {/* max-w-5xl => ki amx itni hi width hogi jisse ham box bana payehga ,,,,,,,,,, mx-auto  => center ma le aayeha in x direction ..............    */}
                <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
                    {/* userData?.photoUrl    => Means ki agar userData hai tho uska photoUrl le lenga ... */}
                    <img src={userData?.photoUrl || userData?.name.slice(0, 1).toUpperCase()}
                        className='w-28 h-28 rounded-full object-cover border-4 border-black shadow-md' alt="Educator" />


                    <div className='text-center md:text-left space-y-1' >
                        <h1 className='text-2xl font-bold text-gray-800' >{userData?.name || "Educator"}</h1>
                        <h1 className='text-xl font-bold text-gray-900' >Total Earning : 0</h1>
                        <p className='text-2xl font-semibold text-gray-900 text-sm' >{userData?.description || "Start Creating Courses for Your Students "} </p>
                        <h1 className='cursor-pointer border-2 max-w-40  md:pl-5 ml-12 md:ml-0 rounded-md text-gray-900 border-gray-500 hover:bg-black hover:text-white  ' onClick={() => navigate("/courses ")} >Create Courses</h1>
                    </div>


                </div>


                {/* Graph section */}
                <div>

                </div>
            </div>
        </div>

    )
}

export default Dashboard