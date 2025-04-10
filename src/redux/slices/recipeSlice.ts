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
        }
    }
});

export const { setPostedRecipes, addRecipe, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
