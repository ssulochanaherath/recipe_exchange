import React, { useState, useEffect } from "react";

const Account = () => {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [myRecipes, setMyRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [userName, setUserName] = useState(""); // To store the user's name

    useEffect(() => {
        // Retrieve the user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserName(storedUser.name); // Set the user's name from localStorage
        }

        // Fetch user's recipes and saved recipes
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
            authorName: userName, // Use the user's name from state
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
                    <h1 className="text-2xl font-bold text-gray-800">{userName || "Current User"}</h1>
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
                            className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>

            {/* My Posts Feed */}
            <div className="max-w-4xl mx-auto mt-10 space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">📝 My Recipes</h2>
                {myRecipes.map((r) => (
                    <div key={r.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="flex items-center space-x-3 p-4">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{userName || "Current User"}</p>
                                <p className="text-sm text-gray-500">Just now</p>
                            </div>
                        </div>
                        {r.image && <img src={r.image} alt="" className="w-full h-64 object-cover" />}
                        <div className="p-4 text-gray-700">{r.description}</div>
                    </div>
                ))}
            </div>

            {/* Saved Recipes Feed */}
            <div className="max-w-4xl mx-auto mt-14 space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">💾 Saved Recipes</h2>
                {savedRecipes.map((r) => (
                    <div key={r.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="flex items-center space-x-3 p-4">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{r.authorName || "User"}</p>
                                <p className="text-sm text-gray-500">Saved</p>
                            </div>
                        </div>
                        {r.image && <img src={r.image} alt="" className="w-full h-64 object-cover" />}
                        <div className="p-4 text-gray-700">{r.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Account;
