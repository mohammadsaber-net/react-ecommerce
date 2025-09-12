import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
export const fetchingCategory=createAsyncThunk("sliceCategory/fetchingCategory",async(cate)=>{
    let data=await fetch("https://ecommerce-back-pys6.onrender.com/products/category/"+cate).then(res=>res.json())
    return data.data.products
})
export const sliceCategory=createSlice({
    initialState:[],
    name:"sliceCategory",
    extraReducers:(builder)=>{
        builder.addCase(fetchingCategory.fulfilled,(state,action)=>{
            return state=action.payload
        })
    }
})
export const {}=sliceCategory.actions