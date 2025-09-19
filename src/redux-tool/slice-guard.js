import { createSlice } from "@reduxjs/toolkit";

export const gaurdCard=createSlice({
    initialState:null,
    name:"gaurdCard",
    reducers:{
        passing:(state,action)=>{
            return state=action.payload
        },
        resetGaurd:(state)=>{
            return state=null
        }
    }
})
export const {passing,resetGaurd}=gaurdCard.actions