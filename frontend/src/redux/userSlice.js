/* Yeha hema user ki Silice Create krna hai  */

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",  /* My Mistake is ki mena yeha ye likha tha ye     name:user,
 */
    initialState: {
        userData: null
    },
    reducers: {
        setUserData : (state, action) => {
            state.userData = action.payload
        }
    }

})

export const { setUserData } = userSlice.actions /* esse ky hoga ki jio hamera setuserdata hai vo 
set ho jayega hamera userSlice  ke ander. .... */

export default userSlice.reducer  /* userSlice as a reducer ham, yeha se pass kr raha hai .. */