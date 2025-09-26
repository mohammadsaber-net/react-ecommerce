import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const sendingOrder=createAsyncThunk("sendingOrderSlice/sendingOrder",async(order)=>{
    try {
        const response=await fetch("/order/payment",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        body:JSON.stringify(order)
    })
    if(!response.ok){
        const errorData=await response.json()
        return errorData.message
    }
    const data =await response.json()
    return data
    } catch (error) {
        return error
    }
    
})
export const sendingOrderSlice=createSlice({
    initialState:{
        data:null,
        loading:false
    },
    name:"sendingOrderSlice",
    reducers:{
        resetSendingOrder:(state)=>{
            state.data=null
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(sendingOrder.pending,(state)=>{
            state.loading=true
        })
        .addCase(sendingOrder.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        .addCase(sendingOrder.rejected,(state,action)=>{
            state.loading=false
            state.data=action.payload || "failed fetching"
        })
    }
})
export const {}=sendingOrderSlice.actions
export const {resetSendingOrder}=sendingOrderSlice.actions