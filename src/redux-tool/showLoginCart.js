import { createSlice } from "@reduxjs/toolkit";

export const sliceConfirmLogin=createSlice({
    initialState:false,
    name:"sliceConfirmLogin",
    reducers:{
        setConfirm:(state,action)=>{
            return state=action.payload
        }
    }
})
export const {setConfirm}=sliceConfirmLogin.actions