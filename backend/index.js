import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors"
import userRoute from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";

dotenv.config();

const app = express();

 app.use(express.json())
 app.use(cookieParser())



 app.use(cors({
origin:"http://localhost:5173", 
credentials:true
 }))  /* ek cors package hai vo frontend and backend ki bich ma connetivity maintaiain krta hai .
 And && hame usme ek origin dena hota hai tho orign ma frontend ka ek URL de denga  */


 

 /* Hamena jo route banaya hai  authRoute waka usse hema yeha lena hai.. */
 /* api/auth   jb bhi ma ye seach kruga ko jo auth route ko start kr dega  */
 app.use("/api/auth" ,authRouter)  /* MY MISTKE IS KI MENA YEHA  '/' LAGANA BHUL GAYA THA BEFOR API */
 app.use("/api/user" ,userRoute)
 app.use("/api/course" ,courseRouter)

const port = process.env.PORT || 8000;

connectDB();

app.get("/", (req, res) => {
    res.send("Hello From Server");
});

app.listen(port, () => {
    console.log(`Server Starting at Port ${port}`);
});


