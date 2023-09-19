import { createSlice } from "@reduxjs/toolkit";

const AuthUserSlicer = createSlice({
    name:"AuthUser",
    initialState:{
        user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
        authToken:localStorage.getItem("authToken")?JSON.parse(localStorage.getItem("authToken")):false,
    },
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload;
        },
        setAuthToken:(state, action)=>{
            state.authToken = action.payload;
        }
    }
});

export const { setUser, setAuthToken } = AuthUserSlicer.actions;
export default AuthUserSlicer.reducer;