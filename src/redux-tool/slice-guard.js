import { createSlice } from "@reduxjs/toolkit";

export const gaurdCard=createSlice({
    initialState:false,
    name:"gaurdCard",
    reducers:{
        passing:(state,action)=>{
            return state=action.payload
        }
    }
})
export const {passing}=gaurdCard.actions