  import React from 'react'
  import { useState } from 'react'
  import { useNavigate } from "react-router-dom"
  import axios from "axios"
  import { serverUrl } from '../App';
  import { toast } from 'react-toastify';
  import { ClipLoader } from 'react-spinners';

  const ForgetPassword = () => {





    const [step, setStep] = useState(1)
    const navigate = useNavigate();





    /* Ab hama sendotp , verifyotp , resetotp ko fetch krna hai yeha  */
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [loading, setLoading] = useState(false);

    /* For Step One . */
    const sendOtp = async () => {
      /* jb tk hamera paas  koi data nhi aaya tb tk  */
      setLoading(true)

      /* jase hi hamera paas koi data aa jata hai */
      try {
        const result = await axios.post(serverUrl + "/api/auth/sendotp", { email }, { withCredentials: true })
        console.log(result.data)
        /* Jasa hi hamera result aa jata hai vesa hi ham step 2 pr chala jayenge  */
        setLoading(false)
        setStep(2)
        toast.success(result.data.message)
      } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to send OTP"
    );

    setLoading(false);
  }
    }

    /* For Step 2 . */
    const verifyOtp = async () => {
      setLoading(true)

      try {
        const result = await axios.post(serverUrl + "/api/auth/verifyotp", { email, otp }, { withCredentials: true })
        console.log(result.data)
        /* Jasa hi hamera result aa jata hai vesa hi ham step 2 pr chala jayenge  */
        setLoading(false)
        setStep(3)
        toast.success(result.data.message)
      } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to send OTP"
    );

    setLoading(false);
  }

    }


    /* step 3  */

    const resetPassword = async () => {
      setLoading(true)
      if (newPassword !== conPassword) {
        return toast.error("Password Not Matched")
      }
      try {/* password:newPassword       Means ki password ma hama new Password dena hai.  */
        const result = await axios.post(serverUrl + "/api/auth/resetpassword", { email, password: newPassword }, { withCredentials: true })
        console.log(result.data)
        /* Jasa hi hamera result aa jata hai vesa hi ham step 2 pr chala jayenge  */
        setLoading(false)
        navigate("/login")
        toast.success(result.data.message)
      }catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to send OTP"
    );

    setLoading(false);
  }

    }


    return (
      <div className='min-h-screen flex items-center justify-center bg-red-100 px-4'  >
        {/* niche wala divs ko centere pe lana aka kaam kr raha hai ye =>>>>>> flex items-center justify-center */}
        {/* step 1  */} {/* matlab agar mera step ki valuye 1 hai tho mujhe ye wala div show kr wana hai .  */}
        {/* ek fix width rekhana ke liya   we use max-w-md */}
        {step === 1 && <div className='bg-white shadow-md  rounded-xl p-8 max-w-md w-full  '  >
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'  >Forget Your Password</h2>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
            <div>
              <label htmlFor="email"> Email
                {/* focus:outline-none this is very import for input because ye jo bydefault jo black line aati ahi usse remove kr saktha hai . */}
                <input
                  onChange={(e) => setEmail(e.target.value)} value={email}

                  id="email"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                  placeholder="you@example.com"
                  required
                />

              </label>
              <button onClick={sendOtp}
                disabled={loading}
                /* w-full   this is importa here  */
                className="w-full mt-2 bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              >
                {loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}
              </button>

            </div>
            <div onClick={() => navigate("/login")} className='cursor-pointer  text-sm text-center mt-4' >Back To Login</div>

          </form>
        </div>}

        {/* step 2  */} {/* matlab agar mera step ki valuye 2 hai tho mujhe ye wala div show kr wana hai .  */}
        {step === 2 && <div className='bg-white shadow-md  rounded-xl p-8 max-w-md w-full  '  >
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'  >Enter Your Otp</h2>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
            <div>
              <label className='font-bold' htmlFor="otp"> Please Enter Your 4-digit code sent to your email.
                {/* focus:outline-none this is very import for input because ye jo bydefault jo black line aati ahi usse remove kr saktha hai . */}
                <input
                  onChange={(e) => setOtp(e.target.value)} value={otp}

                  /* Kya Type use krna hai is very important =====>>>> type="text" */
                  id="otp"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                  placeholder="Enter Your OTP Here ."
                  required
                />

              </label>
              {/* onClick={verifyOtp}  ==>> Mena yeha esa call hi nhi kiya tha . */}
              <button onClick={verifyOtp} disabled={loading}
                /* w-full   this is importa here  */
                className="w-full mt-2 bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              >
                {loading ? <ClipLoader size={30} color='white' /> : "Verify OTP"}
              </button>

            </div>
            <div onClick={() => navigate("/login")} className='cursor-pointer  text-sm text-center mt-4' >Back To Login</div>

          </form>
        </div>}


        {/* step  3  */} {/* matlab agar mera step ki valuye  3 hai tho mujhe ye wala div show kr wana hai .  */}
        {step === 3 && <div className='bg-white shadow-md  rounded-xl p-8 max-w-md w-full  '  >
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'  >Reset Your Password</h2>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
            <div>
              <label className='font-bold' htmlFor="reset"> Enter a New Password below to regain access to Your Account.
                {/* focus:outline-none this is very import for input because ye jo bydefault jo black line aati ahi usse remove kr saktha hai . */}
                <input
                  onChange={(e) => setNewPassword(e.target.value)} value={newPassword}

                  id="reset"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                  placeholder="Enter New Password"
                  required
                />

              </label>


              {/* confirm Password */}
              <div className='mt-2' >
                {/* confirm Password */}
                <label className=' ' htmlFor="confirm"> Confirm Your Password Again .
                  {/* focus:outline-none this is very import for input because ye jo bydefault jo black line aati ahi usse remove kr saktha hai . */}
                  <input
                    onChange={(e) => setConPassword(e.target.value)} value={conPassword}

                    id="confirm"
                    type="text"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                    placeholder="Confirm Your New Password"
                    required
                  />

                </label>
              </div>
              <button onClick={resetPassword} required={loading}
                /* w-fullc    this is importa here  */
                className="w-full mt-2 bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              >
                {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}
              </button>

            </div>
            <div onClick={() => navigate("/login")} className='cursor-pointer  text-sm text-center mt-4' >Back To Login</div>

          </form>
        </div>}
      </div>
    )
  }

  export default ForgetPassword