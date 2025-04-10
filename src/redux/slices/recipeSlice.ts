// recipeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {}; // Store recipes per userId/email

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {
        addRecipe: (state, action) => {
            state.push(action.payload);
        },
        setPostedRecipes: (state, action) => {
            return action.payload;
        },
        removeRecipe: (state, action) => {
            return state.filter((recipe) => recipe.id !== action.payload.id);
        },
        loadRecipes: (state, action) => {
            return action.payload;
        },
    }
});

export const { setPostedRecipes, addRecipe, removeRecipe,loadRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
