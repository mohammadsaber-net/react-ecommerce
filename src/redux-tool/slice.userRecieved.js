import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const fetchUserRecieved=createAsyncThunk("userRecievedSlice/fetchUserRecieved",async({update, id})=>{
    try {
        const response=await fetch(`/order/purchasement`,{
        method:"post",
        headers:{
            "Content-Type": "application/json",
        },
        credentials:"include",
        body:JSON.stringify({update,id})
    })
    if(!response.ok){
        const errorData=await response.json()
        console.log(errorData)
        return errorData
    }
    const data=await response.json()
    console.log(data)
    return data
    } catch (error) {
       return error.message 
    }
})
export const userRecievedSlice=createSlice({
    initialState:{
        data:null,
        loading:false
    },
        name:"userRecievedSlice",
        reducers:{
            resetUserRecievedSlice:(state)=>{
                state.data=null
                state.loading=false
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(fetchUserRecieved.pending,(state)=>{
                state.loading=true
            })
            .addCase(fetchUserRecieved.fulfilled,(state,action)=>{
                state.loading=false
                state.data=action.payload
            })
            .addCase(fetchUserRecieved.rejected,(state,action)=>{
                state.loading=false
                state.data=action.payload
            })
        }
})
export const {}=userRecievedSlice.actions
export const {resetUserRecievedSlice}=userRecievedSlice.actions