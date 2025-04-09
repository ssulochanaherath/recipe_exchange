import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import { loadState, saveState } from './localStorage';

// Load state from localStorage
const persistedState = loadState();

const store = configureStore({
    reducer: {
        account: accountReducer,
    },
    preloadedState: persistedState,
});

// Save state to localStorage whenever it changes
store.subscribe(() => {
    saveState({
        account: store.getState().account,
    });
});

export default store;
