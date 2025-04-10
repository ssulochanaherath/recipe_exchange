import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from '../redux/slices/recipeSlice';  // Adjust the path accordingly
import { loadState } from '../redux/localStorage';
import Navbar from "../component/Navbar.tsx";  // Adjust the path accordingly

const HomePage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);

    useEffect(() => {
        // Get the userId from your state, for example from the logged-in user
        const userId = 'yourUserId';  // You can replace this with dynamic userId
        const storedState = loadState(userId);

        if (storedState && storedState.recipes) {
            // Dispatch the action to set the recipes in Redux
            dispatch(loadRecipes(storedState.recipes));
        }
    }, [dispatch]);

    return (
        <div>
            <Navbar />

            <h1 className="text-center text-3xl font-bold my-4">Recipe Wall</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {recipes.length === 0 ? (
                    <p>No recipes found.</p>
                ) : (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="p-4">

                            <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover mt-2" />
                            <h3 className="text-xl font-semibold">{recipe.name}</h3>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
