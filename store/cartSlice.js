import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../src/config";
import { remove } from "lodash";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        error: null
    },
    reducers: {
        add: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        decrease: (state, action) => {
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems = state.cartItems.map(item => {
                if (item.id === action.payload.id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }return item;
                }filter(item => item.quantity > 0);
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.error = null
            })
            .addCase(getCart.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.error = null
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.cartItems = [];
                state.error = null
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const getCart = createAsyncThunk('cart/getCart', async ({ userID, token }, thunkAPI) => {
        const res = await fetch(`${API_BASE_URL}/cart/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (data.status === 'OK') return data.items;

        return thunkAPI.rejectWithValue(data.message);
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ userID, cartItems, token }, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/cart`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({uid: userID, items: cartItems})
    });
    const data = await res.json();
    if (data.status === 'OK') return data.items;

    return thunkAPI.rejectWithValue(data.message);
});

export const clearCart = createAsyncThunk('cart/clearCart', async ({userID, token}, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/cart/${userID}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (data.status === 'OK') return [];
    
    return thunkAPI.rejectWithValue(data.message);
});

export const { add, decrease } = cartSlice.actions;
export default cartSlice.reducer;