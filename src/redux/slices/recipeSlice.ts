import { createSlice } from '@reduxjs/toolkit';

// Initial state for the recipe slice
const initialState = [];

// Recipe slice to manage posted recipes
const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setPostedRecipes: (state, action) => {
            return action.payload; // Set the posted recipes to the payload
        },
        addRecipe: (state, action) => {
            state.push(action.payload); // Add a new recipe to the list
        },
        removeRecipe: (state, action) => {
            return state.filter((recipe) => recipe.id !== action.payload); // Remove recipe by id
        },
    },
});

// Export the actions
export const { setPostedRecipes, addRecipe, removeRecipe } = recipeSlice.actions;

// Export the reducer
export default recipeSlice.reducer;
