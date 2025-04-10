export const loadState = (userId) => {
    try {
        const serializedState = localStorage.getItem(userId);
        if (!serializedState) return undefined;

        const parsedState = JSON.parse(serializedState);

        // Ensure recipes is always an array, even if it's missing or malformed
        return {
            ...parsedState,
            recipes: Array.isArray(parsedState.recipes) ? parsedState.recipes : [],
        };
    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

export const saveState = (state, userId) => {
    try {
        const serializedState = JSON.stringify(state);

        // Always make sure the state has valid data before saving
        if (state && userId) {
            localStorage.setItem(userId, serializedState);
        } else {
            console.warn("Attempted to save invalid state", state);
        }
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};
