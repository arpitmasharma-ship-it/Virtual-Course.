/* Yeha pe ham getCurrentUser ko fetch krange okey */
import React from 'react'
import { useEffect } from 'react'
import {serverUrl} from "../App.jsx"
import axios from "axios"
import {useDispatch} from "react-redux"
import { setUserData } from '../redux/userSlice.js'


const useGetCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => { /* esme ham current user ko get krna wala hai */
            try {
                const result = await axios.get(
                    serverUrl + "/api/user/getcurrentuser",
                    {withCredentials:true}
                )

                dispatch(setUserData(result.data))

            } catch (error) {
                console.log(error)
                dispatch(setUserData(null))  /* agaar koi error aaya tho ye fir se null ho jaye  */
            }
        }

        fetchUser()

    }, [dispatch])
}

export default useGetCurrentUser


// /* Yeha pe ham getCurrentUser ko fetch krange okey */
// import React from 'react'
// import { useEffect } from 'react'
// import {serverUrl} from "../App.jsx"
// import axios from "axios"
// import {useDispatch} from "react-redux"
// import { setUserData } from '../redux/userSlice.js'


// const getCurrentUser = () => {
//     const dispatch = useDispatch()
//   return (
//    useEffect(()=>{
// const fetchUser = async () => { /* esme ham current user ko get krna wala hai  */
//     try {
//         const result = await axios.get(serverUrl + "/api/user/getcurrentuser" , {withCredentials:true})/* yeha ham post requestv tho send kr nhi raha hai thi hamea yeha kuch bhi pass krna ki jarurat nhi hai. */
//      dispatch(setUserData(result.data))
    
//     } catch (error) {
//         console.log(error)
//          dispatch(setUserData(null)) /* agaar koi error aaya tho ye fir se null ho jaye  */
//     }
// }
// fetchUser()
//    },[])
//   )
// }

// export default getCurrentUser