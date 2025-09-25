import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const addProduct=createAsyncThunk("addProductSlice/addProduct",async(product,{ rejectWithValue })=>{
    try{
        let data=await fetch("https://ecommerce-back-pys6.onrender.com/products",{
            method:"POST",
            credentials:"include",
        body:product
    });
     if (!data.ok) {
        const errorData = await data.json();
        console.log(errorData)
        return rejectWithValue(errorData.status || errorData);
      }

      const responseData = await data.json();
      return responseData;
      } catch (error) {
      return rejectWithValue(error.message);
    }
});

export const addProductSlice=createSlice({
    name:"addProductSlice",
    initialState:{
        loading:false,
        product:null
    },
    reducers:{
        resetAddProduct:((state)=>{
            state.loading=false
            state.product=null
        })
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addProduct.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.loading=false;
            state.product = action.payload;
        });
    }
});

export const {}=addProductSlice.actions;
export const {resetAddProduct}=addProductSlice.actions