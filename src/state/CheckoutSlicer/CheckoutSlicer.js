import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const CheckoutSlicer = createSlice({
    name: "checkout",
    initialState: {
        items: [],
        totalPrice: 0,
        authToken: null,
    },
    reducers: {
        addForCheckout: (state, action) => {
            let ifExists = false;
            state.items.forEach((element)=>{
                if(element.product.id === action.payload.product.id){
                    ifExists = true;
                }
            })
            if(!ifExists){

                state.items.push(action.payload);
                state.items.forEach((element) => {
                    if (element.product.id === action.payload.product.id) {
                        state.totalPrice += element.product.price * element.quantity;
                    }
                });
            }
        },
        removeFromCheckout: (state) => {
            const newState = {
                items:[],
                totalPrice:0,
                authToken:localStorage.getItem("authToken"),
            }
            state = newState;
        },
        setCheckoutAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        removeCheckoutAuthToken: (state) => {
            state.authToken = null;
        }
    }
})

export const { addForCheckout, removeFromCheckout, setCheckoutAuthToken, removeCheckoutAuthToken } = CheckoutSlicer.actions;
export default CheckoutSlicer.reducer;