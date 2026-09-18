import React from 'react'

import logo from "../assets/logo.jpg"/*  */
import Google from "../assets/google.jpg"/*  */
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { provider, auth } from '../../utils/firebase';


const Login = () => {

  /* We Wilkl Create A UseState  */
  const [show, setShow] = useState(false)
  /* navigate krna ke liye from signUp to Login */
  const navigate = useNavigate()



  /* to cnnect with backend */
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  /* jb tk result nhi aa jata tb tk loading dikhana ke liye .... */
  const [loading, setloading] = useState(false)


  /* dispatch */
  const dispatch = useDispatch()



  const handelLogin = async (e) => {
    e.preventDefault();  /* YE NHI LIKHA THA THO BHT SARE ERROES AA GAYA THA .... */
    /* Backend ma jo signup wala route create kiya tha authRoute ma usko ab frontend se call krwana hai . */


    /* jb hamera yeha response nhi aayega tb ham yeha circle animation use krange  */
    setloading(true)


    try {

      /* Axios frontend aur backend ke beech communication karwata hai.
      Matlab React se backend ko request bhejne ke liye Axios use kar sakte ho. */

      /* dATA AANA MA TIME  lag saktha hai isliye jb tk Data nhi aa jata tb tk ham Yhi ruka rehange . */
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
      /* with credential ko true krna se apka token cookie ma store hio jayega .  */
      /* ager response aa jata hai tho ham setLoading ko false kra denge  */
      setloading(false)

      console.log(result.data)

      dispatch(setUserData(result.data))


      toast.done("Login Succewssfully")
      navigate("/")
      /* jb hamera koi error aata hai tb bhi ham setLoading ko false kr denge  */
    } catch (error) {
      console.log(error)
      setloading(false);
      toast.error(error.response.data.message)
    }

  }




  /* Google se Authentacation krana ke liya  */
  const googleLogin = async () => {
    try {
      /* hama yeha ek response lena hai 
      jb ham yeha google se authentaction krange yeha pe tb hamera yeha ek response aayega . */
      const response = await signInWithPopup(auth, provider) /* auth and providers dono utils se aa raha hai . */
      console.log(response)
      /* response se mujghe kuch data leke aana hai . */
      let user = response.user
      let gname = user.displayName
      let gemail = user.email
      /* ab es name and email ke trough mujhe user ko create krana hai .AND ager user already exist krta hai tho usse sidha Login Krwa denge . */

      /* yeha ham fetch krange  */

      const result = await axios.post(serverUrl + "/api/auth/googleauth", { name: gname, email: gemail }, { withCredentials: true })

      /* jb result aa jaye  */

      dispatch(setUserData(result.data))
      toast.done("Login Succewssfully")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }



  return (

    /* IN Tailwind Csa => w-[25%] =>  Make the element's width 25% of its parent's width. */
    <div className="bg-[#dadbab] w-[100vw] h-[100vh] flex items-center justify-center">
      <form onSubmit={handelLogin} className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex ">

        {/* Left Section */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className='text-semibold text-black text-2xl'   >Let's Get Started</h1>
            <h2 className='text-gray-600 text-18px'   >Login  To Your Account</h2>
          </div>




          {/* Email Input */}
          <div className='flex flex-col gap-1  w-[80%] items-start justify-center px-3' >

            <label htmlFor="email" className='font-semibold'  >Email</label>   {/* yeha htmlFor = "name"   mtlb ki jb ma label pa bhi click kruga tho mera input pe click ho jeyga  */}
            <input onChange={(e) => setEmail(e.target.value)} value={email} id='email' type="email" placeholder="Enter Your Email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]    ' />

          </div>


          {/* Password Input */}
          <div className=' relative  flex flex-col gap-1  w-[80%] items-start justify-center px-3' >

            <label htmlFor="password" className='font-semibold'  >Password</label>   {/* yeha htmlFor = "name"   mtlb ki jb ma label pa bhi click kruga tho mera input pe click ho jeyga  */}
            {/* Here in input in type we use dynamic  text means jo bhi likha hai vio show hoga and password ka mtlb hai ki o show nhi hoga  */}
            <input onChange={(e) => setPassword(e.target.value)} value={password} id='password' type={show ? "text" : 'password'} placeholder="Enter Your Password" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]    ' />
            {/* Dynamic Java  Script To Show The Eyes */}
            {show ? <IoEyeOutline onClick={() => setShow(!show)} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' />
              : <IoEye onClick={() => setShow(!show)} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' />
            }
          </div>
          {/* Yeha Mujhe confusion tha ki input me type ma kya krna hai ab clear ho gaya . */}


          {/* Role  */}
          <div className='flex  md:w-[50%]  w-[70%]  items-center  justify-between   '      >
            <span
              className=" hover:shadow-md px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black">
              Student</span>
            <span className="px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black">
              Educator</span>

          </div>

          {/* Button for Login */}  {/* to sumbit  the Form  */}
          <button
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" >
            {loading ? <ClipLoader size={30} color='white' /> : "Login"}
          </button>
          <span onClick={() => navigate("/forget")} className='text-[13px]  cursor-pointer text-[#585757]  ' >Fortget Your Password .?.</span>


          {/*          Or Sapce   */}
          <div className='w-[80%]  flex items-center  gap-2 justify-center'   >
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]  ' ></div>
            <div>Or</div>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]  '  ></div>
          </div>

          {/* Google Login */}
          <div onClick={googleLogin} className='cursor-pointer  w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center'>
            <img width={25} className='' src={Google} alt="" />
            <span className='text-xl text-gray-500'   >oogle</span>
          </div>



          <div className="text-sm text-gray-500 text-center">
            Create Your account{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-semibold text-black cursor-pointer hover:underline underline-offset-4 transition-all"
            >
              Signup
            </span>
          </div>


        </div>

        {/* Right Section */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="logo" className='w-30 shadow-2xl' />
          <span className='text-2xl text-white'    >VIRTUAL CLASSES</span>
        </div>


      </form>
    </div>
  )
}

export default Login