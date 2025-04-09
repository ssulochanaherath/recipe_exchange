export const loadState = (userId) => {
    try {
        const serializedState = localStorage.getItem(userId); // Fetch state from localStorage using userId as the key
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

export const saveState = (state, userId) => {
    try {
        const serializedState = JSON.stringify(state); // Serialize state
        localStorage.setItem(userId, serializedState); // Save it under the userId key
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};

