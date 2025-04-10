import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from '../redux/slices/recipeSlice';
import Navbar from "../component/Navbar.tsx";
import RecipeForm from '../component/RecipeForm';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state: any) => state.recipes);

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
    }, [dispatch]);

    const openRecipePopup = (recipe: any) => {
        const recipeWindow = window.open('', '_blank', 'width=600,height=400');

        // Add content to the new window
        if (recipeWindow) {
            recipeWindow.document.write(`
                <html>
                    <head>
                        <title>${recipe.name}</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>${recipe.name}</h2>
                        <img src="${recipe.image}" alt="${recipe.name}" style="max-width: 100%; height: auto; margin-bottom: 20px;">
                        <p><strong>Description:</strong> ${recipe.description}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            ${recipe.ingredients.map((ingredient: string) => `<li>${ingredient}</li>`).join('')}
                        </ul>
                        <button onclick="window.close()" style="margin-top: 20px; padding: 10px; background-color: #f44336; color: white; border: none; cursor: pointer;">
                            Close
                        </button>
                    </body>
                </html>
            `);
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
                    recipes.map((recipe: any) => (
                        <div
                            key={recipe.id}
                            onClick={() => openRecipePopup(recipe)}  // Open pop-up on click
                        >
                            <RecipeForm recipe={recipe} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
