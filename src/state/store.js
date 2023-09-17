import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from './CategoriesSlicer/CategoriesSlicer';


export const store = configureStore({
    reducer:{
        categories:CategoryReducer,
    }
})