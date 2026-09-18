import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react';
import { useDispatch } from "react-redux"
import axios from "axios"
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


const EditProfile = () => {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user) /* Yeha user slice se hamera paas data aa jayega . */



    /* now here we will create various UseSattes   */

    const [name, setName] = useState(userData.name || "")
    const [description, setDescription] = useState(userData.description || "")
    const [photoUrl, setPhotoUrl] = useState(null)
    const dispatch = useDispatch()  /* User Data ko set krna ka liya .. */
    const [loading, setLoading] = useState(false)


    /*  HAMA YEHA EK FORM DATA BANANA PADEGA KYUKI IMAGE HAMRI FORM DATA MA STORE HOTI HAI */
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("photoUrl", photoUrl)



    /* Ab Hama yeha ek function banana hoga jo handel kra */

    const handelEditProfile = async () => {
        /* Jb tak data nhi aa jata tb tk Loading Wala page show krwana hai . */
        setLoading(true)
        try {


            /* mena yeha /api/user/profile ki jagha /api/auth/profile Likh diya tha . */
            const result = await axios.post(serverUrl + "/api/user/profile", formData, { withCredentials: true })
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/")
            toast.success("Profile Updated .")
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }



    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 ' >
            <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'  >
                <FaArrowCircleLeft size={30} color='black' className='cursor-pointer' onClick={() => navigate("/profile")} />

                {/* Edit Heading  */}
                <div className='flex items-center justify-center mb-2 text-2xl font-semibold' >
                    <h2 >Edit Profile</h2>
                </div>


                <form onSubmit={(e) => e.preventDefault()} action="" className='space-y-6' >
                    <div className='flex itesm-center justify-center text-center ' >
                        {/* Photo Url  Information.  */}
                        <div className='flex flex-col items-center text-center mt-5 cursor-pointer '  >
                            {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black ' alt="" />
                                : <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
                                    {userData?.name.slice(0, 1).toUpperCase()}
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        {/* imputs */}
                        {/*  accept='image/*'     shrif images hi select hofi only  */}
                        <label className='text-sm font-medium text-gray-700 ' htmlFor="image">Select Avtar</label>
                        <input onChange={(e) => setPhotoUrl(e.target.files[0])} className='w-full px-4 py-2  border rounded-mx text-sm' id='image' type="file" name='photoUrl'
                            placeholder='photoUrl'
                            accept='image/*' />

                    </div>

                    <div>
                        {/* imputs */}
                        {/*  accept='image/*'     shrif images hi select hofi only  */}
                        <label className='text-sm font-medium text-gray-700 ' htmlFor="name">Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-2  border rounded-mx text-sm' id='name' type="text"
                            placeholder={userData.name}
                        />

                    </div>


                    <div>
                        {/* imputs */}
                        {/*  accept='image/*'     shrif images hi select hofi only  */}
                        <label className='text-sm font-medium text-gray-700 ' htmlFor="email">Email</label>
                        <input readOnly className='w-full px-4 py-2  border rounded-mx text-sm' id='email' type="text"
                            placeholder={userData.email}
                        />

                    </div>


                    <div>
                        {/* imputs */}
                        {/*  accept='image/*'     shrif images hi select hofi only  */}
                        <label className='text-sm font-medium text-gray-700 ' htmlFor="bio">Bio</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]"
                            id='bio' type="text"
                            placeholder="Tell About YourSelf..."
                            rows={3} />

                    </div>

                    <div className='flex items-center justify-center' >
                        <button disabled={loading} onClick={handelEditProfile} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gray-900 to-black text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer"  >{loading ? <ClipLoader size={30} color='white' /> : "Save Changes"}</button>
                    </div>
                </form>



            </div>
        </div>
    )
}

export default EditProfile

