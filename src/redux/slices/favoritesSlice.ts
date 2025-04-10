import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
    },
    reducers: {
        addFavorite: (state, action) => {
            const { id, name, description, ingredients } = action.payload; // no image or huge fields
            const exists = state.favorites.some(fav => fav.id === id);
            if (!exists) {
                state.favorites.push({ id, name, description, ingredients });
            }
        },

        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload.id);
        },

        loadFavorites: (state, action) => {
            state.favorites = action.payload || [];
        }

    },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
