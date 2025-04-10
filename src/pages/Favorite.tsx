import React from 'react';
import { useSelector } from 'react-redux';
import RecipeForm from '../component/RecipeForm';
import Navbar from "../component/Navbar.tsx";

const FavoritePage = () => {
    const favorites = useSelector((state: any) => state.favorites.favorites);

    return (
        <div>
            <Navbar />
            <h1 className="text-center text-3xl font-bold my-4">Favorite Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {favorites.length === 0 ? (
                    <p>No favorite recipes found.</p>
                ) : (
                    favorites.map((recipe: any) => (
                        <div key={recipe.id}>
                            <RecipeForm recipe={recipe} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoritePage;
