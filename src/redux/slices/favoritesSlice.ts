import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    },
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.favorites.some(fav => fav.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },

        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload.id);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },

        loadFavorites: (state, action) => {
            state.favorites = action.payload || [];
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
    },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
