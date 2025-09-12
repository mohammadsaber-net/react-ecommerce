import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    initialState:[],
    name:"cartSlice",
    reducers:{
        addToCart:(state,action)=>{
            let findProduct=state.find(product=>product.id===action.payload.id)
            if(findProduct){
                findProduct.quantity +=1
            }else{
                let product={...action.payload,quantity:1}
                state.push(product)
            }       
        },
        changeAmount:(state,action)=>{
            let amount=action.payload.quantity
            let findProduct=state.find(product=>product.id===action.payload.product.id)
            if(amount<1){
                findProduct.quantity = 1
            }else{
                findProduct.quantity = amount
            }
        },
        deleteFromCart:(state,action)=>{
            return state.filter(product=>product.id !== action.payload.id)
        },
        removeCart:(state,action)=>{
            return state=[]
        },
        increaseAndDcrease:(state,action)=>{
            let findProduct=state.find(product=>product.id===action.payload.product.id)
            
            if(action.payload.state==="+"){
                findProduct.quantity +=1
            }else{
                findProduct.quantity -=1
            }
            
        }
    }
})
export const{addToCart,increaseAndDcrease,changeAmount,removeCart,deleteFromCart}=cartSlice.actions