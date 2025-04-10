import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import recipeReducer from './slices/recipeSlice';
import { loadState, saveState } from './localStorage';

// Assuming userId is fetched from the logged-in user's state or localStorage
const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email; // Or use any unique identifier

// Only load persisted state if userId is valid
const persistedState = userId ? loadState(userId) : { account: {}, recipes: [] };

const store = configureStore({
    reducer: {
        account: accountReducer,
        recipes: recipeReducer,
    },
    preloadedState: persistedState, // Load the state for the current user if userId exists
});

// Save state to localStorage whenever it changes, but store it under the user's unique ID
store.subscribe(() => {
    if (userId) {
        saveState({
            account: store.getState().account, // Save the 'account' state
            recipes: store.getState().recipes, // Save the 'recipes' state
        }, userId); // Save state for the specific user
    }
});

export default store;