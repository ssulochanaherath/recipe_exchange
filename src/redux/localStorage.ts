// Function to load global recipes (not tied to userId)
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('allRecipes'); // Load the global recipes under the key 'allRecipes'
        if (!serializedState) return undefined;

        const parsedState = JSON.parse(serializedState);

        // Ensure recipes is always an array, even if it's missing or malformed
        return {
            recipes: Array.isArray(parsedState.recipes) ? parsedState.recipes : [],  // Return recipes only
        };
    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

// Function to save global recipes (not tied to userId)
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);

        // Always make sure the state has valid data before saving
        if (state) {
            localStorage.setItem('allRecipes', serializedState);  // Save global recipes under the key 'allRecipes'
        } else {
            console.warn("Attempted to save invalid state", state);
        }
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};
