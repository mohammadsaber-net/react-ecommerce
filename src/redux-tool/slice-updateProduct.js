import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({formData, id}) => {
    const token = localStorage.getItem("token");
    console.log("product id in redux is :----",id);
    const response = await fetch(`https://ecommerce-back-pys6.onrender.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      return response.json();
    }
    return response.json();
  }
);

export const updatedProductSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    product: null
  },
  reducers: {
    resetUpdateProduct: (state) => {
      state.loading = false;
      state.product = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      });
  },
});

export const { setSelectedProduct } = updatedProductSlice.actions;
export const { resetUpdateProduct } = updatedProductSlice.actions;
export default updatedProductSlice.reducer;
