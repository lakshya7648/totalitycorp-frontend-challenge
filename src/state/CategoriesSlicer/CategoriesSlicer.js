import { createSlice } from "@reduxjs/toolkit";
import Categories from "../../components/Categories";

const CategoriesSlicer = createSlice({
    name:"Categories",
    initialState:{
        category:[],
    },
    reducers:{
        setCategory:(state, action)=>{
            state.category = action.payload;
        }
    }
});

export const {setCategory} = CategoriesSlicer.actions;
export default CategoriesSlicer.reducer;