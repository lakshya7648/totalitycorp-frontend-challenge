import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from './CategoriesSlicer/CategoriesSlicer';
import CartReducer from "./CartSlicer/CartSlicer";
import AuthUserReducer from "./AuthUserSlicer/AuthUserSlicer";
import CheckoutReducer from "./CheckoutSlicer/CheckoutSlicer";


export const store = configureStore({
    reducer:{
        categories:CategoryReducer,
        carts:CartReducer,
        authUser:AuthUserReducer,
        checkout:CheckoutReducer,
    }
})