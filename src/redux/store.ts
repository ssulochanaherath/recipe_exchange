import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import recipeReducer from './slices/recipeSlice';
import { loadState, saveState } from './localStorage';
import favoritesReducer from './slices/favoritesSlice';

const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email;

const persistedState = userId ? loadState(userId) : { account: {}, recipes: [] };

const store = configureStore({
    reducer: {
        account: accountReducer,
        recipes: recipeReducer,
        favorites: favoritesReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    if (userId) {
        saveState({
            account: store.getState().account,
            recipes: store.getState().recipes,
            favorites: store.getState().favorites,
        }, userId);
    }
});

export default store;