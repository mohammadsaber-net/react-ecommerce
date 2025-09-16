import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
export const adminLogin=createAsyncThunk("adminLogin/adminLogin",async(admin)=>{
    try{
        let data=await fetch("https://ecommerce-back-pys6.onrender.com/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(admin)
        })
        let res=await data.json()
        if(!data.ok){
            return res
        }
        return res
    }catch(err){
        return err.message
    }
})

export const adminLoginSlice=createSlice({
    name:"adminLogin",
    initialState:{
        userInfo:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=>{
            state.loading=true
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading=false
            state.userInfo=action.payload
            if(action.payload.status==="SUCCESS"){
                localStorage.setItem("token",action.payload.token);
            }
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addDefaultCase((state,action)=>{state.userInfo=null})
    }
})

export default adminLoginSlice.actions