import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    userData: null

}
//yeh hamne kiya hai ki to ask from the store that wether if the user is logged in or not ..
const authSlice = createSlice({
    initialState: initialState,
    name: "auth",        //Remeber that ki yeh teen cheezein chaiye hoti while making the authSlice
    reducers: {//yeh khud ek object mein hai islye '=' ki jagah ':' use kiya hai 
        login: (state, action) => {
            state.status = true, // isko may object samaghna yeh to function hai 
                state.userData = action.payload//now agr user login hai to uska data aage send kar rahe agar nahi hai toh login ke andar dispatch aayega
        }, //yeh toh object ke object ke andar hai therfore isliye use kiya hai :
        logout: (state, action) => {
            state.status = false,
                state.userData = null //to tell the user that he is not being looged in for now 

        }
    }

})
export const { login, logout } = authSlice.actions

export default authSlice.reducer

