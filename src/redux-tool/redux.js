import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice-product";
import { cartSlice } from "./slice-cart";
import { oneProductSlice } from "./slice-one-product";
import { gaurdCard } from "./slice-guard";
// import { sliceLogin } from "./slice-login";
import { sliceCategory } from "./slice-category";
import { sliceConfirmLogin } from "./showLoginCart";
import { addProductSlice } from "./slice-addProduct";
import {  adminLoginSlice } from "./adminLogin";
import { sliceDeleteProduct } from "./slice-deleteProduct";
import { updatedProductSlice } from "./slice-updateProduct";
import { isAdminSlice } from "./isAdmin";
import {  createUserSlice } from "./slice-register";
export const store =configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:cartSlice.reducer,
        oneProduct:oneProductSlice.reducer,
        pass:gaurdCard.reducer,
        cateProducts:sliceCategory.reducer,
        showLogin:sliceConfirmLogin.reducer,
        addproduct:addProductSlice.reducer,
        adminLogin:adminLoginSlice.reducer,
        deleteProduct:sliceDeleteProduct.reducer,
        updateProduct:updatedProductSlice.reducer,
        isAdmin:isAdminSlice.reducer,
        addUser:createUserSlice.reducer
    }
})