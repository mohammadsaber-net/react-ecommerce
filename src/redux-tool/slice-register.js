
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const createUser=createAsyncThunk("createUserSlice/createUser",async(data,{ rejectWithValue })=>{
    console.log(data)
    try {
        let respone=await fetch(`https://ecommerce-back-pys6.onrender.com/user/register`,{
        method:"POST",
        body:data
    })
    if(!respone.ok){
        const errorData=await respone.json()
        return rejectWithValue(errorData)
    }
        const responseData=await respone.json()
        return responseData
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const createUserSlice=createSlice({
    initialState:{
        loading:false,
        data:null
    },
    name:"createUserSlice",
    reducers:{
        resetAddUser:(state)=>{
            state.loading=false
            state.data=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
    }
})
export const{}=createUserSlice.actions
export const{resetAddUser}=createUserSlice.actions