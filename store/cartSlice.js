import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        add: (state, action) => {
            const productToAdd = state.cartItems.find(product => product.id === action.payload.id);
            if (productToAdd) {
                productToAdd.quantity += 1;
            }else{
                state.cartItems.push({...action.payload, quantity: 1})
            }
        },
        remove: (state, action) => {
            const productIndex = state.cartItems.findIndex(product => product.id === action.payload.id)
            if (productIndex !== -1) {
                if (state.cartItems[productIndex].quantity > 1) {
                    state.cartItems[productIndex].quantity -= 1;
                }else{
                    state.cartItems.splice(productIndex, 1)
                }
            }
        },
        clear: (state) => {
            state.cartItems = [];
        },
    }
})

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;