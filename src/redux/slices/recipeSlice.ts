// recipeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            state.push(action.payload);
        },
        setRecipes: (state, action) => {
            return action.payload;
        }
    }
});

export const { addRecipe, setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
