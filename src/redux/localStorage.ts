export const loadState = (userId) => {
    try {
        const serializedState = localStorage.getItem(userId);
        if (!serializedState) return undefined;

        const parsedState = JSON.parse(serializedState);

        return {
            ...parsedState,
            // Ensure recipes is always an array
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
        localStorage.setItem(userId, serializedState);
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};
