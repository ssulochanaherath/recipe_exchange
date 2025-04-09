// src/redux/slices/accountSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Get data from localStorage if available
const loadProfileFromLocalStorage = () => {
    const profile = localStorage.getItem("userProfile");
    return profile ? JSON.parse(profile) : null;
};

const initialState = loadProfileFromLocalStorage() || {
    name: "",
    career: "",
    location: "",
    age: "",
    image: "https://i.pravatar.cc/100", // Default image
};

// Create slice
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountDetails: (state, action) => {
            // Update state with new details
            const updatedProfile = action.payload;
            return { ...state, ...updatedProfile };
        },
    },
});

export const { setAccountDetails } = accountSlice.actions;
export default accountSlice.reducer;
