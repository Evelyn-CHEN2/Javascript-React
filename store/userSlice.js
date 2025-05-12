import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../src/config";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // userList: [],  //Store all registered users, can be used for admin panels
        loggedUser: null,  //Store the currently logged-in user
        error: null
    },
    reducers: {
        signOut: (state) => {
            state.loggedUser = null;
        },
        setLoggedUser: (state, action) => {
            state.loggedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.error = null
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.error = null
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loggedUser = {...state.loggedUser, name: action.payload.name, password: action.payload.password};
                //Update the logged user with new name or password, so user can change their name or password again after updating
                state.error = null
            })
            .addCase(update.rejected, (state, action) => {
                state.error = null;
            })
    }
})
export const signUp = createAsyncThunk('user/signUp', async (userData, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const data = await res.json();
    if (data.status === 'OK') return data;
    return thunkAPI.rejectWithValue(data.message);
    
})

export const signIn = createAsyncThunk('user/signIn', async (userData, thunkAPI) => {
    const res = await fetch(`${API_BASE_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    const data = await res.json();
    if (data.status === 'OK') return data;
    return thunkAPI.rejectWithValue(data.message);
})

export const update = createAsyncThunk('user/update', async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const userID = state.user.loggedUser?.id
    if (!userID) return thunkAPI.rejectWithValue("User not found");

    const payload = {userID, ...userData}
    const res = await fetch(`${API_BASE_URL}/users/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${state.user.loggedUser?.token}`  // Add the token to the headers
         },
        body: JSON.stringify(userData)
    })
    const data = await res.json();
    if (data.status === 'OK') return data;
    return thunkAPI.rejectWithValue(data.message);
})

export const { setLoggedUser, signOut } = userSlice.actions;
export default userSlice.reducer