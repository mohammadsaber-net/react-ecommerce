// src/redux/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk باستخدام fetch
export const initiatePayment = createAsyncThunk(
  'payment/initiate',
  async (amount, { rejectWithValue }) => {
    const token=localStorage.getItem("token")
    try {
      const res = await fetch("https://ecommerce-back-pys6.onrender.com/paymob/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.log("data from error =>" ,error)
        return rejectWithValue(error);
    }
    
    const data = await res.json();
    console.log("data from data =>" ,data)
      return data.paymentUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    paymentUrl: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.paymentUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.paymentUrl = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ في الدفع";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export const {}=paymentSlice.actions
