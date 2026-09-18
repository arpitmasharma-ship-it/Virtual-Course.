/* Yeha ham Course ka Slice banana wala hai ... */
/* Yeha hema user ki Silice Create krna hai  */

import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",  /* My Mistake is ki mena yeha ye likha tha ye     name:user,
 */
    initialState: {
        creatorCourseData: null,
        courseData: null   /* esme publish Courses wala Data aayega ... */ , 
        selectedCourse:null
    },
    reducers: {
        setCreatorCourseData: (state, action) => {
            state.creatorCourseData = action.payload
        },

        setcourseData: (state, action) => {
            state.courseData = action.payload
        } , 
/* Galti se Yeha Mena Async bana diya tha ............. */
        setSelectedCourse:  (state , action) => {
            state.selectedCourse =  action.payload
        }
    }

})

export const { setCreatorCourseData } = courseSlice.actions /* esse ky hoga ki jio hamera setuserdata hai vo 
set ho jayega hamera creatorCourseSlice  ke ander. .... */

export const { setcourseData} = courseSlice.actions
export const { setSelectedCourse} = courseSlice.actions

export default courseSlice.reducer  /* creatorCourseSlice as a reducer ham, yeha se pass kr raha hai .. */