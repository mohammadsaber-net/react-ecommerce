import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const getUsersOrders=createAsyncThunk("getUsersOrdersSlice/getUsersOrders",async()=>{
    const token=localStorage.getItem("token")
    try {
        const response=await fetch("https://ecommerce-back-pys6.onrender.com/order/purchasement",{
        headers:{
            "Authorization": `bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        const errorData=await response.json()
        return errorData
    }
    const data=await response.json()
    return data
    } catch (error) {
       return error.message 
    }
})
export const getUsersOrdersSlice=createSlice({
    initialState:{
        data:null,
        loading:false
    },
        name:"getUsersOrdersSlice",
        reducers:{
            resetgetUsersOrders:(state)=>{
                state.data=null
                state.loading=false
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(getUsersOrders.pending,(state)=>{
                state.loading=true
            })
            .addCase(getUsersOrders.fulfilled,(state,action)=>{
                state.loading=false
                state.data=action.payload
            })
            .addCase(getUsersOrders.rejected,(state,action)=>{
                state.loading=false
                state.data=action.payload
            })
        }
})
export const {}=getUsersOrdersSlice.actions
export const {resetgetUsersOrders}=getUsersOrdersSlice.actions