import React, { useState, useEffect } from "react";

const Account = () => {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [myRecipes, setMyRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const handlePost = () => {
        if (!image || !description) return alert("Fill all fields");

        const newRecipe = {
            image,
            description,
            authorName: "Current User",
        };

        // Call backend to save recipe
        fetch("http://localhost:3000/api/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecipe),
        })
            .then((res) => res.json())
            .then((data) => {
                setMyRecipes([...myRecipes, data]);
                setImage("");
                setDescription("");
            });
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/my-recipes").then(res => res.json()).then(setMyRecipes);
        fetch("http://localhost:3000/api/saved-recipes").then(res => res.json()).then(setSavedRecipes);
    }, []);

    return (
        <div className="min-h-screen bg-white p-6 space-y-10">
            <h1 className="text-3xl font-bold text-center">👤 My Account</h1>

            <div className="bg-gray-100 p-6 rounded-xl shadow-md space-y-4 max-w-xl mx-auto">
                <h2 className="text-xl font-semibold">Post a New Recipe</h2>
                <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full p-3 rounded-lg border"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <textarea
                    placeholder="Recipe description"
                    className="w-full p-3 rounded-lg border"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                    onClick={handlePost}
                >
                    Share Recipe
                </button>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">📜 My Recipes</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {myRecipes.map((r) => (
                            <div key={r.id} className="border rounded-xl overflow-hidden shadow">
                                <img src={r.image} alt="" className="w-full h-48 object-cover" />
                                <p className="p-4">{r.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">💾 Saved Recipes</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {savedRecipes.map((r) => (
                            <div key={r.id} className="border rounded-xl overflow-hidden shadow">
                                <img src={r.image} alt="" className="w-full h-48 object-cover" />
                                <p className="p-4">{r.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
