import { createSlice } from '@reduxjs/toolkit';

interface AccountState {
    name: string;
    career: string;
    location: string;
    age: string;
    image: string;
}

const initialState: AccountState = {
    name: '',
    career: '',
    location: '',
    age: '',
    image: 'https://i.pravatar.cc/100', // Default image
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountDetails: (state, action) => {
            state.name = action.payload.name;
            state.career = action.payload.career;
            state.location = action.payload.location;
            state.age = action.payload.age;
            state.image = action.payload.image;
        },
        clearAccountDetails: () => initialState, // Optional: to clear account data
    },
});

export const { setAccountDetails, clearAccountDetails } = accountSlice.actions;
export default accountSlice.reducer;
