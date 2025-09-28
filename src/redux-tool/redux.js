import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice-product";
import { cartSlice } from "./slice-cart";
import { oneProductSlice } from "./slice-one-product";
import { gaurdCard } from "./slice-guard";
import { sliceCategory } from "./slice-category";
import { sliceConfirmLogin } from "./showLoginCart";
import { addProductSlice } from "./slice-addProduct";
import {  adminLoginSlice } from "./adminLogin";
import { sliceDeleteProduct } from "./slice-deleteProduct";
import { updatedProductSlice } from "./slice-updateProduct";
import {  createUserSlice } from "./slice-register";
import { paymentSlice } from "./paymentSlice";
import { totalPrice } from "./slice-totalPrice";
import { sendingOrderSlice } from "./confirmOrder";
import { getUsersOrdersSlice } from "./slice-usersOrders";
import { authenticationSlice } from "./authentication";
import {userRecievedSlice } from "./slice.userRecieved";
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
        addUser:createUserSlice.reducer,
        payment:paymentSlice.reducer,
        totalPrice:totalPrice.reducer,
        sendingOrder:sendingOrderSlice.reducer,
        getUsers:getUsersOrdersSlice.reducer,
        checkAuth:authenticationSlice.reducer,
        orderRecieved:userRecievedSlice.reducer,
    }
})