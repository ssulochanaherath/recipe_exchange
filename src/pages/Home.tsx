import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from '../redux/slices/recipeSlice';
import Navbar from "../component/Navbar.tsx";
import RecipeForm from '../component/RecipeForm';

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
        const recipeWindow = window.open('', '_blank', 'width=600,height=600');

        // Add content to the new window
        if (recipeWindow) {
            recipeWindow.document.write(`
            <html>
                <head>
                    <title>${recipe.name}</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fa;
                        }
                        .popup-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                            overflow: hidden;
                        }
                        h2 {
                            font-size: 2rem;
                            color: #333;
                            margin-bottom: 10px;
                        }
                        img {
                            width: 100%;
                            height: auto;
                            border-radius: 8px;
                            margin-bottom: 20px;
                        }
                        p {
                            color: #555;
                            font-size: 1rem;
                            line-height: 1.5;
                        }
                        h3 {
                            font-size: 1.25rem;
                            margin-top: 20px;
                            color: #333;
                        }
                        ul {
                            padding-left: 20px;
                            list-style-type: disc;
                            margin-top: 10px;
                        }
                        li {
                            color: #555;
                            font-size: 1rem;
                            margin-bottom: 5px;
                        }
                        button {
                            background-color: #4CAF50;
                            color: white;
                            padding: 12px 24px;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 1rem;
                            margin-top: 20px;
                            transition: background-color 0.3s ease;
                        }
                        button:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>
                    <div class="popup-container">
                        <h2>${recipe.name}</h2>
                        <img src="${recipe.image}" alt="${recipe.name}" />
                        <p><strong>Description:</strong> ${recipe.description}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            ${recipe.ingredients.map((ingredient: string) => `<li>${ingredient}</li>`).join('')}
                        </ul>
                        <button onclick="window.close()">Close</button>
                    </div>
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
