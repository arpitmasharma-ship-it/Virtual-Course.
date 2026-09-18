import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { setcourseData } from '../redux/courseSlice'

const getPublishedCourse = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCourseData = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/course/getpublished", { withCredentials: true })
                console.log(result.data)
                /* Ma yeha wala point bhul gaya tha ..... ki am dispatch laya kyu hu data set krana ka liya ... */
                dispatch(setcourseData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        getCourseData()
    }, [])

}

export default getPublishedCourse


/* Use Effect UnderStanding 

1. Custom hook kyun?
Maan lo tumhe backend se published courses lana hai:
GET /api/course/getpublished
Agar ye logic directly ExploreCourses.jsx mein likh doge:
useEffect(() => {
    axios.get(...)
}, [])
toh component ke andar API logic mix ho jayega.
Custom hook:
useGetPublishedCourse()
ka kaam sirf:
"Backend se published courses lekar aao."

Example:
const useGetPublishedCourse = () => {

    useEffect(() => {

        const fetchCourses = async () => {

            const result = await axios.get(
                serverUrl + "/api/course/getpublished"
            )

            // Redux me store
        }

        fetchCourses()

    }, [])
}
2. Redux Slice kyun?
Ab maan lo tumne courses fetch kar liye.
[
   { title: "React" },
   { title: "Node" },
   { title: "MongoDB" }
]
Ye data sirf ExploreCourses ko chahiye toh Redux ki zarurat nahi.
Lekin agar same published courses:
ExploreCourses
      ↓
CourseCard
      ↓
CourseDetails
      ↓
Search
      ↓
Dashboard
multiple components/pages mein use karne hain, toh Redux useful hai.
Slice mein:
publishedCourseData: []
rakh sakte ho.
Phir kahin bhi:
const { publishedCourseData } = useSelector(
    state => state.course
)*/

/* 
🔥 Lekin important baat
Custom hook + Redux slice compulsory nahi hai.
Agar tumhara use case simple hai:
"Mujhe published courses fetch karne hain aur sirf ExploreCourses page par dikhane hain."

Toh:
❌ Ye over-engineering hai
Custom Hook
     ↓
Axios
     ↓
Redux
     ↓
Slice
     ↓
ExploreCourses
✅ Simple rakho
ExploreCourses
     ↓
useEffect
     ↓
Axios
     ↓
State
 */