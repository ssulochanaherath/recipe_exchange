import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from '../redux/slices/recipeSlice';
import { loadFavorites, addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import Navbar from "../component/Navbar.tsx";
import RecipeForm from '../component/RecipeForm';
import RecipeModal from '../component/RecipeModal';

const HomePage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state: any) => state.recipes);
    const favorites = useSelector((state: any) => state.favorites.favorites);

    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const allRecipes = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("recipes-")) {
                try {
                    const storedRecipes = JSON.parse(localStorage.getItem(key));
                    if (Array.isArray(storedRecipes)) {
                        allRecipes.push(...storedRecipes);
                    }
                } catch (err) {
                    console.error(`Error loading recipes from ${key}:`, err);
                }
            }
        }
        dispatch(loadRecipes(allRecipes));

        // Load favorites from localStorage only once
        dispatch(loadFavorites());
    }, [dispatch]);

    const openRecipePopup = (recipe: any) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    const handleFavoriteToggle = (recipe: any) => {
        const isAlreadyFavorite = favorites.some((fav: any) => fav.id === recipe.id);
        if (isAlreadyFavorite) {
            dispatch(removeFavorite(recipe));
        } else {
            dispatch(addFavorite(recipe));
        }
    };

    return (
        <div>
            <Navbar />
            <h1 className="text-center text-3xl font-bold my-4">Recipe Wall</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {recipes.length === 0 ? (
                    <p>No recipes found.</p>
                ) : (
                    recipes.map((recipe: any) => {
                        const isFavorite = favorites.some((fav: any) => fav.id === recipe.id);

                        return (
                            <div
                                key={recipe.id}
                                onClick={() => openRecipePopup(recipe)}
                                className="cursor-pointer"
                            >
                                <RecipeForm
                                    recipe={recipe}
                                    isFavorite={isFavorite}
                                    onFavoriteToggle={() => handleFavoriteToggle(recipe)}
                                />
                            </div>
                        );
                    })
                )}
            </div>

            {/* Recipe Modal */}
            <RecipeModal
                isOpen={isModalOpen}
                recipe={selectedRecipe}
                closeModal={closeModal}
            />
        </div>
    );
};

export default HomePage;
