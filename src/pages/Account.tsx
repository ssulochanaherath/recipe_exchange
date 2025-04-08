import React, { useState, useEffect } from "react";

const Account = () => {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [myRecipes, setMyRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [userName, setUserName] = useState(""); // To store the user's name

    useEffect(() => {
        // Retrieve logged-in user data from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser && loggedInUser.name) {
            setUserName(loggedInUser.name); // Set the username from localStorage
        } else {
            setUserName("Guest");  // Default to "Guest" if no user data is found
        }

        // Fetch user's recipes and saved recipes (if applicable)
        fetch("http://localhost:3000/api/my-recipes")
            .then((res) => res.json())
            .then(setMyRecipes);

        fetch("http://localhost:3000/api/saved-recipes")
            .then((res) => res.json())
            .then(setSavedRecipes);
    }, []);

    const handlePost = () => {
        if (!image || !description) return alert("Fill all fields");

        const newRecipe = {
            image,
            description,
            authorName: userName,  // Use the user's name from state
        };

        fetch("http://localhost:3000/api/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecipe),
        })
            .then((res) => res.json())
            .then((data) => {
                setMyRecipes([data, ...myRecipes]);
                setImage("");
                setDescription("");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
            {/* Profile Header */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
                <img
                    src="https://i.pravatar.cc/100"
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {userName || "Current User"}
                    </h1>
                    <p className="text-gray-500">Welcome to your recipe wall</p>
                </div>
            </div>

            {/* Post a New Recipe */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6 space-y-4">
                <div className="flex items-start space-x-4">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <textarea
                            placeholder="Share a recipe..."
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Image URL (optional)"
                            className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <button
                            onClick={handlePost}
                            className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg"
                        >
                            Post Recipe
                        </button>
                    </div>
                </div>
            </div>

            {/* My Recipes */}
            <div className="max-w-4xl mx-auto mt-6">
                <h2 className="text-xl font-bold text-gray-800">My Recipes</h2>
                <div className="space-y-4">
                    {myRecipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white p-4 rounded-lg shadow-md">
                            <img
                                src={recipe.image}
                                alt={recipe.description}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <p className="mt-2 text-gray-700">{recipe.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Saved Recipes */}
            <div className="max-w-4xl mx-auto mt-6">
                <h2 className="text-xl font-bold text-gray-800">Saved Recipes</h2>
                <div className="space-y-4">
                    {savedRecipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white p-4 rounded-lg shadow-md">
                            <img
                                src={recipe.image}
                                alt={recipe.description}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <p className="mt-2 text-gray-700">{recipe.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Account;
