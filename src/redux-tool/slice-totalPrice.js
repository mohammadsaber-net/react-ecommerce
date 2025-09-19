import { createSlice } from "@reduxjs/toolkit";
export const totalPrice=createSlice({
    initialState:null,
    name:"totalPrice",
    reducers:{
        totalOrder:(state,action)=>{
            return state=action.payload
        }
    }
})
export const {totalOrder}=totalPrice.actions