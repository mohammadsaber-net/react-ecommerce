import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchProduct =createAsyncThunk("productSlice/fetchProduct",async()=>{
    let data=await fetch("https://ecommerce-back-pys6.onrender.com/products").then(res=>res.json())
    return data.data.products
})
export const productSlice =createSlice({
    initialState:[],
    name:"productSlice",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.fulfilled,(state, action) => {
            return state= action.payload
        })
    }

})
export const {}=productSlice.actions
