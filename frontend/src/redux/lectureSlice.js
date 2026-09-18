/* Yeha ham Course ka Slice banana wala hai ... */
/* Yeha hema user ki Silice Create krna hai  */

import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
    name: "lecture",  /* My Mistake is ki mena yeha ye likha tha ye     name:user,
 */
    initialState: {
        lectureData: []  /* yeha badi mistake ho gai thi ki lecture ka l mean yeha L Capital likh diya tha ...  */ 
    },
    reducers: {
        setLectureData: (state, action) => {
            state.lectureData = action.payload
        }
         ,


        updateLecture: (state, action) => {
        const updatedLecture = action.payload;

        state.lectureData = state.lectureData.map((lecture) =>
            lecture._id === updatedLecture._id
                ? updatedLecture
                : lecture
        );
    }
    }

})



export const { setLectureData} = lectureSlice.actions
export const { updateLecture } = lectureSlice.actions;
export default lectureSlice.reducer  /* creatorCourseSlice as a reducer ham, yeha se pass kr raha hai .. */


