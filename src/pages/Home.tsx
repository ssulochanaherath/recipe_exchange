import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/recipes")
            .then((res) => res.json())
            .then((data) => setRecipes(data))
            .catch((err) => console.error("Error fetching recipes:", err));
    }, []);

    const handleFavorite = (id: string | number) => {
        console.log("Favorited recipe ID:", id);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {recipes.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No recipes found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                            >
                                <img
                                    src={recipe.image}
                                    alt="Recipe"
                                    className="w-full h-52 object-cover"
                                />
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {recipe.description}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Posted by: {recipe.authorName}
                                    </p>
                                    <button
                                        onClick={() => handleFavorite(recipe.id)}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition"
                                    >
                                        ❤️ Favorite
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
