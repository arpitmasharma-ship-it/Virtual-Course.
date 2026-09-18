/* Authentication ke liya controller for logiIn signUp and Logout    */

import User from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";


/* SignUp */

// export const signUp = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body   /* react se bheja hua data mila yeha pe   */
//         const existUser = await User.findOne({ email })
//         if (existUser) {
//             return res.status(400).json({
//                 message: "User Already Exists"
//             })
//         }
//         /* User jo email; type kr raha hai kya vo shi hai ya nhi ye check krna ke liya
//         We will Use Validator  */
//         /* isEmail is a property of the validator to check the email  */
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({
//                 message: "Enter Valid Email"
//             })
//         }

//         if (password.length < 8) {
//             return res.status(400).json(
//                 {
//                     message: "Enter a Strong Password"

//                 }
//             )
//         }


//         //////// now hamea password ko hash kerana hi hai matlab krana hi hai to we /* we will use await */
//         let hashPassword = await bcrypt.hash(password, 10)
//         /* Now we will create the user  */
//         const user = await User.create({
//             name, email, password: hashPassword, role
//         })


//         /* now ab jasa hi hamera user create ho vesa hi hamea ek token create krna hai  */
//         let token = await genToken(user._id)
//         /* now i have to store the token ion the cookie  */
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000  /* this is 7 days in miliSeconds  */
//         })
//         /* Cookie ke ander ye Token 7 din ke liya store hoga  */

//         /* we will pass an reasponse here */
//         return res.status(201).json(user)



//     } catch (error) {
//         return res.status(500).json({
//             message: `SignUp Error ${error}`
//         })
//     }
// }

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("SIGNUP BODY:", req.body);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User Already Exists"
      });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter Valid Email"
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Enter a Strong Password"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      message: `SignUp Error: ${error.message}`
    });
  }
};


/* NOW FOR LOGIN */

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        /* User agar exist krta hai tho ham check krange kui jo user na password dala hai vo shi hai ya nhi hai */
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials."
            })
        }

        /* user exist kerta hai password bhi match kr gaya so now we have to create  a token  */

        let token = await genToken(user._id)

        res.cookie("token", token, {    /* here mena res.cookie ki jagha req.cookie likh diya tha . */
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  /* this is 7 days in miliSeconds  */
        })

        /* we will pass an reasponse here */
        return res.status(200).json(user)  /* user ko response ma de raha hai .. */



    } catch (error) {
        return res.status(500).json({
            message: `Login Error ${error}`
        })
    }
}
/* Logout  */

export const Logout = async (req, res) => {
    try {
        /* ham response se  cookie ko clear krwa laga  */
        await res.clearCookie("token")
        /* "token"  means kis name ki  cookie ko clear krwana hai jo hamena cookie name se create ki thi usse clear krna hai. */
        return res.status(200).json({
            message: "Logout Successfuly"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Logout Error ${error}`
        })

    }

}


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body; /* body se ham email le raha hai . */
        const user = await User.findOne({ email }) /* yeha ham email ke through user ko find kr raha hai. */
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        /* agar user mil jata hai tho  */

        /* for otp generation */

        const otp = Math.floor(1000 + Math.random() * 9000).toString()  /* ye random number generate kr dega  for the otp  And hama usse String ma bhi convert krna hai .. */

        /* Ab Hama User ka Ander kuch changes krana hai . */
        user.resetOtp = otp,
            user.otpExpires = Date.now() + 5 * 60 * 1000,   /* es pura ka mtlb hai 5 Minutes */
            user.isOtpVerified = false

        /* Yeha Ham User Ko Save Kra Lega */
        await user.save()

        /* MAil ko send krana hai. */

        await sendMail(email, otp)
        return res.status(200).json({
            message: "Otp Send Successfuly"
        })
    } catch (error) {
        console.log("SEND OTP ERROR:", error);

        return res.status(500).json({
            message: `SendOtp Error ${error.message}`
        });
    }
}



/* Otp Verification */

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        /* Finding user by email */
        const user = await User.findOne({ email })  /* yeha ma await lagana bhul gaya tha . */
        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(404).json({
                message: "Inavlid Otp"
            })
        }
        /* mtlb ager ham yeha tk aa gaya hai tho ye hoga fir  */
        user.isOtpVerified = true,
            user.resetOtp = undefined,
            user.otpExpires = undefined
        /* yeha user ko save kra leta hai */
        await user.save()
        /* Yeha Ham ek response send krange  */
        return res.status(200).json({
            message: "Otp Verified Successfuly"
        })


    } catch (error) {
        return res.status(500).json({
            message: `VerifyOtp Error ${error}`
        })
    }
}


/* New  Password  Create krna hai */

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body

        /* Finding user by email */
        const user = await User.findOne({ email }) /* yeha bhi ma await lagana bhul agya tha . */
        if (!user || !user.isOtpVerified) {
            return res.status(404).json({
                message: "Otp Verification is required "
            })
        }

        /* now agaer user exist krta hai and verified hai then we need to do this */
        const hashPassword = await bcrypt.hash(password, 10) /* password hash ho chuka hai */
        user.password = hashPassword
        user.isOtpVerified = false

        await user.save()
        return res.status(200).json({
            message: "Reset Password Successfuly"
        })

    } catch (error) {
        return res.status(500).json({
            message: `Reset Password Error ${error}`
        })
    }
}



/* yeha mujhe ek controler banana hai jo ki Google ke trough user create kr sakha  . */

export const googleAuth = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                role,
            });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Googlr Auth  Error" });
    }
};
