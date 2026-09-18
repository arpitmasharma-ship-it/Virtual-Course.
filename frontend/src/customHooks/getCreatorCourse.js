// import React, { useEffect } from 'react'
// import axios from "axios"
// import { serverUrl } from '../App'
// import { useDispatch, useSelector } from 'react-redux'
// import { setCreatorCourseData } from '../redux/courseSlice'


// const getCreatorCourse = () => {
//     const dispatch = useDispatch()
//     const { userData } = useSelector(state => state.user)

//         useEffect(() => {
//             const creatorCourse = async () => {
//                 try {
//                     const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true })
//                     console.log(result.data)
//                     dispatch(setCreatorCourseData(result.data))  /* jitna bhi creator ke Courses honge vo sb yeha aa jeyenge ... */

//                 } catch (error) {
//                     console.log(error)

//                 }
//             }
//             creatorCourse()
//         }, [userData]) /* yeha dependency jasa hi mere paas userData aaya vesa hi mera paas coureses bhi aa jaye ... */

// }

// export default getCreatorCourse



// /* Dispatch ham use krta hai Data ko set krna ke liye ...
// and 
// ham useSelector() ko ham use krta hai data ko lena ka liye ... */ 

import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";

const useGetCreatorCourse = () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.user);

    useEffect(() => {

        if (!userData) return;

        const creatorCourse = async () => {

            try {

                const result = await axios.get(
                    serverUrl + "/api/course/getcreator",
                    {
                        withCredentials: true
                    }
                );

                console.log("CREATOR COURSE API:", result.data);

                dispatch(setCreatorCourseData(result.data));

            } catch (error) {

                console.log(
                    "GET CREATOR COURSE ERROR:",
                    error.response?.data || error.message
                );

            }
        };

        creatorCourse();

    }, [userData, dispatch]);
};

export default useGetCreatorCourse;