import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOneProduct=createAsyncThunk("oneProductSlice/fetchOneProduct",async(id)=>{
    let data=await fetch(`https://ecommerce-back-pys6.onrender.com/products/${id}`).then(res=>res.json())
    return data.data.product
})
export const oneProductSlice =createSlice({
    initialState:[],
    name:"productSlice",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchOneProduct.fulfilled,(state, action) => {
            return state= action.payload
        })
        builder.addCase(fetchOneProduct.rejected,(state, action) => {
            return "soory"
        })
    }

})
export const {}= oneProductSlice.actions