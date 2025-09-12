import { createSlice } from "@reduxjs/toolkit";

export const sliceLogin=createSlice({
    initialState:true,
    name:"sliceLogin",
    reducers:{
        loginState:(state,action)=>{
            return state=action.payload
        }
    }
})
export const {loginState}=sliceLogin.actions