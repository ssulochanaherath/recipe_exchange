// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import { loadState, saveState } from './localStorage';

// Assuming userId is fetched from the logged-in user's state or localStorage
const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email; // Or use any unique identifier

// Check if userId exists, if not, we won't load any state
const persistedState = userId ? loadState(userId) : undefined;

const store = configureStore({
    reducer: {
        account: accountReducer,
    },
    preloadedState: persistedState, // Load the state for the current user
});

// Save state to localStorage whenever it changes, but store it under the user's unique ID
store.subscribe(() => {
    if (userId) {
        saveState({
            account: store.getState().account, // Only save the 'account' state
        }, userId); // Save state for the specific user
    }
});

export default store;
