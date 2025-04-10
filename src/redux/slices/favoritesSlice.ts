import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addFavorite: (state, action) => {
            const recipe = action.payload;
            if (!state.some((fav) => fav.id === recipe.id)) {
                state.push(recipe);
            }
        },
        removeFavorite: (state, action) => {
            const recipe = action.payload;
            return state.filter((fav) => fav.id !== recipe.id);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
