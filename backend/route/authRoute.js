/* LISTEN  Hamena jo APIs banai  hai authCobntroller ma ubnko fath krna ke liya hama route bhi banana ppadega inke ... */
import express from "express"  /* becvause routes express ki help se create hota hai isliye  */
import { googleAuth, Login, Logout, resetPassword, sendOtp, signUp, verifyOtp } from "../controller/authController.js"

const authRouter = express.Router()

/* jb ksihi data ko update ya change krna hota hai tb ham use krta hai POST */

authRouter.post("/signup", signUp)
authRouter.post("/login", Login)
authRouter.get("/logout", Logout)
authRouter.post("/sendotp", sendOtp)
authRouter.post("/verifyotp", verifyOtp)
authRouter.post("/resetpassword", resetPassword)
authRouter.post("/googleauth" , googleAuth)

/* ye sb request hama frontend ma krni hai . */

export default authRouter