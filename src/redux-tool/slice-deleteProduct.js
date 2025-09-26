import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const deleteProduct = createAsyncThunk(
  "deleteProduct/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/products/${id}`, {
        method: "DELETE",
        credentials:"include"
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.status || "Failed to delete product");
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sliceDeleteProduct=createSlice({
    name:"delete",
    initialState:{
        loading:false,
        errer:null,
        product:null
    },
  reducers: {
    resetDeleteProduct: (state) => {
      state.loading = false;
      state.product = null;
    }
  },
    extraReducers:(builder)=>{
        builder
        .addCase(deleteProduct.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading=false
            state.product="NOT DELETED"
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false
            console.log(action.payload)
            if(action.payload==="product has been deleted"){
                state.product="DELETED"
            }else{
                state.product="NOT DELETED"
            }
        })
    }
})
export const { }=sliceDeleteProduct.actions
export const {resetDeleteProduct}=sliceDeleteProduct.actions