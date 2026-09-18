/* yeha ham userData ka use krna wala hai ........ */

import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom"
import { IoPersonCircleOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";





const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    /* yeha ham user data leke aayenga because vo bht help kraga . */
    const { userData } = useSelector(state => state.user)
    /* yeha ham user data ko leke aa raha hai .. */
    /* jo hamena userSlice banaya hai na us user se ham userData lena wala hai . */


    const [show, setShow] = useState(false)
    const [showham, setShowham] = useState(false)



    const handleLogut = async () => {

        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            toast.success(result.response.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }



    return (
        <div>
            <div className='w-full h-[70px] fixed top-0 px-[10px] sm:px-[20px] py-[10px] flex items-center justify-between bg-[#34031a47] z-10'>

                {/* Logo Image */}
                <div className='w-[25%] sm:w-[30%] lg:w-[20%] lg:pl-[50px]'>
                    <div
                        onClick={() => navigate("/")}
                        className="group relative flex cursor-pointer select-none items-center justify-center"
                    >
                        {/* Glow */}
                        <div className="absolute -inset-2 rounded-full bg-cyan-500/20 blur-xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

                        {/* Logo */}
                        <span
                            className="relative text-4xl font-black italic tracking-[-0.12em]
    text-white transition-all duration-500
    group-hover:scale-110
    group-hover:tracking-[0.08em]
    group-hover:text-cyan-300
    group-hover:[text-shadow:0_0_8px_#22d3ee,0_0_25px_#22d3ee,0_0_45px_#6366f1]"
                        >
                            A
                            <span className="text-cyan-400 transition-all duration-500 group-hover:text-white">
                                K
                            </span>
                            S
                        </span>

                        {/* Animated underline */}
                        <span
                            className="absolute -bottom-2 left-1/2 h-[2px] w-0
    -translate-x-1/2 rounded-full
    bg-gradient-to-r from-transparent via-cyan-400 to-transparent
    shadow-[0_0_10px_#22d3ee]
    transition-all duration-500
    group-hover:w-full"
                        />

                        {/* Moving shine */}
                        <span
                            className="absolute inset-0 -translate-x-full
    bg-gradient-to-r from-transparent via-white/40 to-transparent
    skew-x-[-20deg]
    transition-transform duration-700
    group-hover:translate-x-full"
                        />
                    </div>
                </div>

                {/* DAshboard , Login AND Logout */}
                <div className='w-auto  lg:w-[30%] lg:flex items-center justify-center gap-4 hidden'>
                    {/* agar user data nhi ahi tb hama ye Profile Show krani ahi */}
                    {!userData && <IoPersonCircleOutline onClick={() => setShow(!show)} className='text-white w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]  cursor-pointer' />}


                    {/* Tb userData hai tb hama ye show krana hai .  */}   {/* for First letter and the profile image . */}
                    {/* ager userData ke ander profile image hai tho hama image show krni ahi nhi to username ka first letter . */}
                    {userData?.photoUrl ? <img  src={userData?.photoUrl} alt=""  className='w-[50px] h-[50px] rounded-full
                                 text-white flex items-center justify-center text-[20px]
                                 border-2 bg-black border-white cursor-pointer' onClick={() => setShow(!show)} /> 
                                 : <div onClick={() => setShow(!show)} className='w-[50px] h-[50px] rounded-full
                                 text-white flex items-center justify-center text-[20px]
                                 border-2 bg-black border-white cursor-pointer'>
                        {/* userData?.name   ==>> iska matlab hai ki userData ma jo name hai vo  */}
                        {userData?.name.slice(0, 1).toUpperCase()}
                    </div>}




                    {/* Logic to show Dashboard */}
                    {/* agar userData ke ander jo role ahi agar vo  educator hua tho ye show krna hai nhi tho ye show nhi krn a. */}
                    {userData?.role === "educator" && <div onClick={()=>navigate("/dashboard")} className='px-[10px] sm:px-[15px] lg:px-[20px] py-[7px] sm:py-[9px] lg:py-[10px] border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer'>
                        Dashboard
                    </div>
                    }

                    {/* Logic for showing the Login And Logout */}
                    {!userData ?

                        /* agar user data hai tho hama ye wala span show krna hai  */
                        <span onClick={() => navigate("/login")}
                            className='px-[10px] sm:px-[15px] lg:px-[20px] py-[7px] sm:py-[9px] lg:py-[10px] border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer'
                        >
                            Login
                        </span>

                        :

                        /* agar user data nhi hai tho ye span show krna hai  */
                        <span onClick={handleLogut} className='px-[10px] sm:px-[15px] lg:px-[20px] py-[7px] sm:py-[9px] lg:py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[13px] sm:text-[16px] lg:text-[18px] cursor-pointer'>
                            LogOut
                        </span>
                    }

                    {show && <div
                        className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black"
                    >
                        <span onClick={() => navigate("/profile")} className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>
                            My Profile
                        </span>

                        <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>
                            My Courses
                        </span>

                    </div>}
                </div>

                <RxHamburgerMenu onClick={() => setShowham(!showham)} className=' text-white w-[35px] h-[35px] lg:hidden fill-white cursor-pointer ' />


                {/* In this transtation logic is cvery Good  ${showham ? "translate-x-[0] transation duration-600" : "translate-x-[-100%] transation duration-600"}`  */}
                <div className={`fixed left-0 top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showham ? "translate-x-[0] transation duration-600" : "translate-x-[-100%] transation duration-600"}`}>

                    <RxCross2 onClick={() => setShowham(!showham)} className='w-[40px] h-[40px] lg:hidden fill-white text-white  cursor-pointer absolute top-4 right-[2%] ' />
                    {!userData && <IoPersonCircleOutline className='w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] fill-black cursor-pointer' />}
                    {userData?.photoUrl ? <img src={userData?.photoUrl} alt="" className='w-[50px] h-[50px] rounded-full
                                 text-white flex items-center justify-center text-[20px]
                                 border-2 bg-black border-white cursor-pointer' /> : <div className='w-[50px] h-[50px] rounded-full
                                 text-white flex items-center justify-center text-[20px]
                                 border-2 bg-black border-white cursor-pointer'>
                        {/* userData?.name   ==>> iska matlab hai ki userData ma jo name hai vo  */}
                        {userData?.name.slice(0, 1).toUpperCase()}
                    </div>}
                    <div onClick={() => navigate("/profile")} className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer'>
                        My Profile
                    </div>

                    <div className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer'>
                        My Courses
                    </div>
                    {userData?.role === "educator" && <div  className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer' onClick={()=>navigate("/dashboard")}   >
                        Dashboard
                    </div>}

                    {!userData ?

                        /* agar user data hai tho hama ye wala span show krna hai  */
                        <span onClick={() => navigate("/login")}
                            className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer'
                        >
                            Login
                        </span>

                        :

                        /* agar user data nhi hai tho ye span show krna hai  */
                        <span onClick={handleLogut} className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[13px] sm:text-[16px] lg:text-[18px] font-light cursor-pointer'>
                            LogOut
                        </span>
                    }



                </div>

            </div>
        </div>
    )
}

export default Navbar