import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, updateProfile } from "../controller/userController.js";
import upload from "../middleware/multer.js"

const userRoute = express.Router() ; 

userRoute.get("/getcurrentuser",isAuth, getCurrentUser)
userRoute.post("/profile" ,isAuth , upload.single("photoUrl") ,updateProfile)



export default userRoute


/*  Example to understand
Jab frontend se ye request aayegi:
axios.get("/api/user/getcurrentuser");

userRoute.get("/getcurrentuser", isAuth, getCurrentUser);
                              ↑
                           middleware

// Request
//    ↓
// isAuth
//    ↓
// Token valid?
//    ↓
// YES → next()
//    ↓
// getCurrentUser */
