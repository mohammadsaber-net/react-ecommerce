import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOneProduct=createAsyncThunk("oneProductSlice/fetchOneProduct",async(id)=>{
    try {
        let data=await fetch(`https://ecommerce-back-pys6.onrender.com/products/${id}`,{
        method:"get"
    });
    if (!data.ok) {
      return data.json();
    }
    return data.json();
    } catch (error) {
        return error.message
    }
})
export const oneProductSlice =createSlice({
    initialState:{
        loading:false,
        product:null
    },
    name:"productSlice",
    reducers:{
        resetAddOneProduct:(state)=>{
            state.product=null
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchOneProduct.pending,(state,action)=>{
            state.loading= false
        })
        builder.addCase(fetchOneProduct.fulfilled,(state, action) => {
            state.product= action.payload
            state.loading= true
        })
        builder.addCase(fetchOneProduct.rejected,(state, action) => {
            state.product= action.payload
            state.loading= true
        })
    }

})
export const {}= oneProductSlice.actions
export const {resetAddOneProduct}= oneProductSlice.actions