import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
export const isAdminSlice=createSlice({
    name:"isAdmin",
    initialState:false,
    reducers:{
        setIsAdmin:(state,action)=>{
            return action.payload
        }
    }
})
export const {setIsAdmin}=isAdminSlice.actions