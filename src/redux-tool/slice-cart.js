import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    initialState:[],
    name:"cartSlice",
    reducers:{
        addToCart:(state,action)=>{
            return state=action.payload     
        },
        changeAmount:(state,action)=>{
            let amount=action.payload.quantity
            let findProduct=state.find(product=>product._id===action.payload.product._id)
            if(amount<1){
                findProduct.quantity = 1
            }else{
                findProduct.quantity = amount
            }
        },
        deleteFromCart:(state,action)=>{
            let products=JSON.parse(localStorage.getItem("order"))
            products= products.filter(product=>product.product._id !== action.payload.product._id)
            if(products.length>0){
                localStorage.setItem("order",JSON.stringify(products))
            }else{
                localStorage.removeItem("order")
            }
            return state=products
        },
        removeCart:(state,action)=>{
            localStorage.removeItem("order")
            return state=[]
        },
        increaseAndDcrease:(state,action)=>{
            let products=JSON.parse(localStorage.getItem("order"))
            let findProduct=products.find(product=>product.product._id===action.payload.product.product._id)
            const index=products.indexOf(findProduct)
            if(action.payload.value==="+"){
                findProduct.quantity +=1
            }else{
                findProduct.quantity -=1
            }
            products[index]=findProduct
            localStorage.setItem("order",JSON.stringify(products))
            return state=JSON.parse(localStorage.getItem("order"))
        }
    }
})
export const{addToCart,increaseAndDcrease,changeAmount,removeCart,deleteFromCart}=cartSlice.actions