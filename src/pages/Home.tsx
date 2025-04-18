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
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const allRecipes = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("recipes-")) {
                try {
                    const storedRecipes = JSON.parse(localStorage.getItem(key) || '[]');
                    if (Array.isArray(storedRecipes)) {
                        allRecipes.push(...storedRecipes);
                    }
                } catch (err) {
                    console.error(`Error loading recipes from ${key}:`, err);
                }
            }
        }

        dispatch(loadRecipes(allRecipes));

        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        dispatch(loadFavorites(savedFavorites));
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

        const updatedFavorites = isAlreadyFavorite
            ? favorites.filter((fav: any) => fav.id !== recipe.id)
            : [...favorites, recipe];

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        dispatch(loadFavorites(updatedFavorites));
    };


    const filteredRecipes = recipes.filter((recipe: any) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            <Navbar />
            <div className="flex justify-between items-center px-4 py-2">
                <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-200">Recipe Wall</h1>
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search recipes..."
                    className="p-2 border rounded-lg w-64 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {filteredRecipes.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">No recipes found.</p>
                ) : (
                    filteredRecipes.map((recipe: any) => {
                        const isFavorite = favorites.some((fav: any) => fav.id === recipe.id);

                        return (
                            <div
                                key={recipe.id}
                                onClick={() => openRecipePopup(recipe)}
                                className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
