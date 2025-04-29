import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: [],  //Store all registered users
        loggedUser: null  //Store the currently logged-in user
    },
    reducers: {
        signUp: (state, action) => {
            const existingUser = state.userList.find(user => user.id === action.payload.id)
            if (!existingUser) {
                state.userList.push({...action.payload})
            }
        },
        logIn: (state, action) => {
            const matchingUser = state.userList.find(user => 
                user.id === action.payload.email.trim().toLowerCase() && 
                user.password === action.payload.password);
            if (matchingUser) {
                state.loggedUser = matchingUser;
            }
        },
        logOut: (state, action) => {
            state.loggedUser = null;
        }
    }
})

export const { signUp, logIn, logOut } = userSlice.actions;
export default userSlice.reducer