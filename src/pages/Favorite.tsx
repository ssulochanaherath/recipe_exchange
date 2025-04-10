import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeForm from '../component/RecipeForm';
import Navbar from "../component/Navbar.tsx";
import { loadFavorites } from "../redux/slices/favoritesSlice.ts";

const FavoritePage = () => {
    const favorites = useSelector((state: any) => state.favorites.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites) {
            dispatch(loadFavorites(storedFavorites));
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            <Navbar />
            <h1 className="text-center text-3xl font-bold my-4 text-gray-900 dark:text-gray-200">Favorite Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {favorites.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">No favorite recipes found.</p>
                ) : (
                    favorites.map((recipe: any) => (
                        <div key={recipe.id} className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <RecipeForm recipe={recipe} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoritePage;
