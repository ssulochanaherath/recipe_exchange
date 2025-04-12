import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
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
        editRecipe: (state, action) => {
            const index = state.findIndex((recipe) => recipe.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };  // Update the recipe
            }
        },
    }
});

export const { setPostedRecipes, addRecipe, removeRecipe, loadRecipes, editRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
