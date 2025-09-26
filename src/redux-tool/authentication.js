import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuthentication = createAsyncThunk(
  'authenticationSlice/fetchCurrentUser',
  async () => {
    try {
      const res = await fetch('/user/checkAuth', {
        method:"get",
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        return data;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: {
    loading: false,
    data:null,
    error:null,
    order:false
  },
  reducers: {
    resetAuthentication: (state) => {
      state.order = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthentication.pending, (state) => {
        state.loading = true;
        state.order = true;
      })
      .addCase(fetchAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.order = true;
        state.data=action.payload
      })
      .addCase(fetchAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.order = true;
        state.error = action.payload;
      });
  },
});

export const { resetAuthentication } = authenticationSlice.actions;
export const {}= authenticationSlice.actions;
