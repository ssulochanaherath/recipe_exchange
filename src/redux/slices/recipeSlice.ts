import { createSlice } from '@reduxjs/toolkit';

// Set the initial state as an empty array
const initialState = [];  // Store recipes globally, not tied to a userId/email

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            state.push(action.payload);  // Add a new recipe
        },
        setPostedRecipes: (state, action) => {
            return action.payload;  // Set the state with a list of recipes (useful for setting posted recipes)
        },
        removeRecipe: (state, action) => {
            return state.filter((recipe) => recipe.id !== action.payload.id);  // Remove a recipe by its ID
        },
        loadRecipes: (state, action) => {
            return action.payload;  // Load all recipes into the state (useful for populating all recipes)
        },
    }
});

// Export the actions for dispatching
export const { setPostedRecipes, addRecipe, removeRecipe, loadRecipes } = recipeSlice.actions;

// Export the reducer as default for configuring the Redux store
export default recipeSlice.reducer;
