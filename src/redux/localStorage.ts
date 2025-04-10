export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('allRecipes');
        if (!serializedState) return undefined;

        const parsedState = JSON.parse(serializedState);

        return {
            recipes: Array.isArray(parsedState.recipes) ? parsedState.recipes : [],
        };
    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);

        if (state) {
            localStorage.setItem('allRecipes', serializedState);
        } else {
            console.warn("Attempted to save invalid state", state);
        }
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};
