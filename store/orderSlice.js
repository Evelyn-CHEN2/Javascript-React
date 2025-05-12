import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../src/config";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderItems: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderItems = action.payload;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.orderItems = action.payload;
                state.error = null;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.orderItems = action.payload;
                state.error = null;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.orderItems = state.orderItems.filter(order => order.id !== action.payload);
                state.error = null
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const createOrder = createAsyncThunk('order/createOrder', async ({ userID, token, items }, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/orders/neworder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userID, items })
    })
    const data = await res.json();
    if (data.status === 'OK') return data;
    
    return thunkAPI.rejectWithValue(data.message);
})

export const getOrder = createAsyncThunk('order/getOrder', async ({ userID, token}, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/orders/all/${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    const data = await res.json();
    if (data.status === 'OK') return data.orders;
    
    return thunkAPI.rejectWithValue(data.message);
})

export const updateOrder = createAsyncThunk('order/updateOrder', async ({ orderID, isPaid, isDelivered, token }, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/orders/updateorder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderID, isPaid, isDelivered })
    })
    const data = await res.json();
    console.log("Response from updateOrder:", data);
    if (data.status === 'OK') return data;

    return thunkAPI.rejectWithValue(data.message);
})

export const cancelOrder = createAsyncThunk('order/cancelOrder', async ({orderID, token}, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/orders/cancel/${orderID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await res.json();
    if (data.status === 'OK') return orderID;
    
    return thunkAPI.rejectWithValue(data.message);
})

export default orderSlice.reducer;