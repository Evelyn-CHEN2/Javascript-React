import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import useReducer from "./userSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: useReducer,
        order: orderReducer
    }
})

export default store;