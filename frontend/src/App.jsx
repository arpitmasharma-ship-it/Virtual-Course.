import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ToastContainer } from "react-toastify";
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import { useNavigate } from "react-router-dom"
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import ExploreCourses from './component/ExploreCourses'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'

import useGetCurrentUser from './customHooks/getCurrentUser'
import useGetCreatorCourse from './customHooks/getCreatorCourse'
import EditCourses from './pages/Educator/EditCourses'
import getPublishedCourse from './customHooks/getPublishedCourse'
import Card from './component/Card'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourse from './pages/ViewCourse'
import ScrollToTop from './component/ScrollToTop'




/* Mujhe yeha  ek server URL banana hai */
/* ye backend ka Url hai  */
// export const serverUrl = "http://localhost:8000" /* ye pura app ma chala jeyagio jop bhi iske elements hai like home signup login  */
/* For Deployment */
// Backend server URL
export const serverUrl = import.meta.env.VITE_API_URL

const App = () => {
  useGetCurrentUser()   /* JB JB HAM hOME PAGE pr aaya tho ahmera function baar baar call ho ... */
  useGetCreatorCourse()
  getPublishedCourse()

  /* yeha hama ab user data leke aana hai . */
  const { userData } = useSelector(state => state.user)  /* yrha user se data aa jayega . */


  /* yeha ham server URL likh leat haub ..........  */


  /* for navigation */
  const navigate = useNavigate()


  return (

    /* my most khatraanka Mistake 
     element={<Card/>} eski jagha mena ye likha  element={Card} ye wala galaat hai ..................  */
    <>
      <ToastContainer />  {/* now ab ham es toast ka use kr payega ham apne pura app ke ander  */}
      <ScrollToTop/>
      
      <Routes>
        <Route path="/" element={<Home />} />  {/* my mistake mena element ke ander likh diya tha ki  {Home} */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route
          path="/forget"
          element={<ForgetPassword />}
        />
        <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
          <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/explorecourses' element={<ExploreCourses />} />
        <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
        <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />
        <Route path='/createcourse' element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
          {/* yeha ham courseId isliye deta hai jiske ki hama params ma courseId mil sakha ...  */}
          <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />} />
          {/* view Course Route  */}
          <Route path='/viewcourse/:courseId' element={userData?.role === "educator" ? <ViewCourse /> : <Navigate to={"/signup"} />} />

      </Routes>




    </>

  )
}

export default App