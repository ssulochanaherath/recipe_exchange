import { createSlice } from '@reduxjs/toolkit';

// Initial state: Get the user from localStorage if it's there
const initialState = {
    user: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('loggedInUser', JSON.stringify(action.payload));
        },
        removeUser: (state) => {
            state.user = null;
            localStorage.removeItem('loggedInUser');
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

// Actions
export const { setUser, removeUser, setError } = authSlice.actions;

// Reducer
export default authSlice.reducer;
