import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/recipes")
            .then((res) => res.json())
            .then((data) => setRecipes(data))
            .catch((err) => console.error("Error fetching recipes:", err));
    }, []);

    const handleFavorite = (id) => {
        console.log("Favorited recipe ID:", id);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">🍴 Recipe Wall</h1>

            <button
                onClick={() => navigate("/account")}
                className="fixed top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
                My Account
            </button>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <img src={recipe.image} alt="Recipe" className="w-full h-56 object-cover" />
                        <div className="p-4 space-y-2">
                            <h2 className="text-xl font-semibold">{recipe.description}</h2>
                            <p className="text-gray-500 text-sm">Posted by: {recipe.authorName}</p>
                            <button
                                className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
                                onClick={() => handleFavorite(recipe.id)}
                            >
                                ❤️ Favorite
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
