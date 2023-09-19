import { createSlice } from "@reduxjs/toolkit";

const CartSlicer = createSlice({
    name: "cart",
    initialState: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {
        items: [],
        totalPrice: 0,
        totalItems: 0,
        authToken: localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null,
    },
    reducers: {
        addToCart: (state, action) => {
            // adding the product to the cart
            state.items.push(action.payload);
            // updating the totalPrice
            state.items.forEach((element) => {
                if (element.product.id === action.payload.product.id) {
                    state.totalPrice += element.product.price * element.quantity;
                }
            })
            //updating totalItems
            state.totalItems = state.items.length;

            // Adding it into the localStorage for getting it every time the user access it with or without login
            localStorage.setItem("cart", JSON.stringify(state));

            // ---------- Logic for updating the user's cart with authenticationToken -------
            if (state.authToken) {
                // logic for cart update in database for every time the user log in
            }
            // ------------------------------------------------------------------------------
        },
        removeFromCart: (state, action) => {
            // updating totalPrice on remove
            state.items.forEach((element) => {
                if (element.product.id === action.payload) {
                    state.totalPrice -= element.product.price * element.quantity;
                }
            })
            // finally removing the element
            state.items = state.items.filter((element) => element.product.id !== action.payload);
            //updating totalItems
            state.totalItems = state.items.length;
            // Adding it into the localStorage for getting it every time the user access it with or without login
            localStorage.setItem("cart", JSON.stringify(state));

            // ---------- Logic for updating the user's cart with authenticationToken -------
            if (state.authToken) {
                // logic for cart update in database for every time the user log in
            }
            // ------------------------------------------------------------------------------
        },
        increaseQuantity: (state, action) => {
            // console.log(action.payload, state.items);
            state.items.forEach((element) => {
                if (element.product.id === action.payload.id) {
                    element.quantity += 1;
                    state.totalPrice += element.product.price;
                }
            })

            // Adding it into the localStorage for getting it every time the user access it with or without login
            localStorage.setItem("cart", JSON.stringify(state));

            // ---------- Logic for updating the user's cart with authenticationToken -------
            if (state.authToken) {
                // logic for cart update in database for every time the user log in
            }
            // ------------------------------------------------------------------------------
        },
        decreaseQuantity: (state, action) => {

            state.items.forEach((element) => {
                if (element.product.id === action.payload.id) {
                    if (element.quantity > 0) {
                        element.quantity -= 1;
                        state.totalPrice -= element.product.price;
                    }
                }
            })


            // Adding it into the localStorage for getting it every time the user access it with or without login
            localStorage.setItem("cart", JSON.stringify(state));

            // ---------- Logic for updating the user's cart with authenticationToken -------
            if (state.authToken) {
                // logic for cart update in database for every time the user log in
            }
            // ------------------------------------------------------------------------------
        },
        moveToCheckout: (state) =>{
            const newState = {
                items: [],
                totalPrice: 0,
                totalItems: 0,
                authToken: JSON.parse(localStorage.getItem("authToken")),
            }
            state = newState;
            localStorage.removeItem("cart");
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, moveToCheckout } = CartSlicer.actions;
export default CartSlicer.reducer;