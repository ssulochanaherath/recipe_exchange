import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountDetails } from "../redux/slices/accountSlice";
import Navbar from "../component/Navbar";
import { addRecipe, setPostedRecipes } from "../redux/slices/recipeSlice";
import { RootState } from '../redux/store.ts';

const Account = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const recipes = useSelector((state:RootState) => state.recipes);

    const [image, setImage] = useState(account.image || "https://i.pravatar.cc/100");
    const [userName, setUserName] = useState(account.name || "");
    const [career, setCareer] = useState(account.career || "");
    const [location, setLocation] = useState(account.location || "");
    const [age, setAge] = useState(account.age || "");
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);

    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeImage, setRecipeImage] = useState(null);
    const [isRecipeEditing, setIsRecipeEditing] = useState(false);

    const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email; // Or any unique identifier

    useEffect(() => {
        if (userId) {
            try {
                const savedUser = JSON.parse(localStorage.getItem(`flavor-exchange-state-${userId}`));
                if (savedUser) {
                    setUserName(savedUser.name || "");
                    setCareer(savedUser.career || "");
                    setLocation(savedUser.location || "");
                    setAge(savedUser.age || "");
                    setImage(savedUser.image || "https://i.pravatar.cc/100");
                    dispatch(setAccountDetails(savedUser));
                }
            } catch (error) {
                console.error("Error loading user profile from localStorage:", error);
            }

            try {
                const savedRecipes = JSON.parse(localStorage.getItem(`recipes-${userId}`));
                if (savedRecipes) {
                    dispatch(setPostedRecipes(savedRecipes));
                }
            } catch (error) {
                console.error("Error loading recipes from localStorage:", error);
            }
        }
    }, [userId]);

    const handleImageUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const saveState = (updatedUser) => {
        if (userId) {
            localStorage.setItem(`flavor-exchange-state-${userId}`, JSON.stringify(updatedUser));
        }
    };

    const handleSaveDetails = () => {
        const updatedUser = {
            name: userName,
            career,
            location,
            age,
            image,
        };

        dispatch(setAccountDetails(updatedUser));
        saveState(updatedUser);

        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    // Handle recipe posting
    const handlePostRecipe = () => {
        const newRecipe = {
            name: recipeName,
            description: recipeDescription,
            ingredients: recipeIngredients.split(',').map(i => i.trim()), // Converts to array
            image: recipeImage || "https://via.placeholder.com/150", // Default image if none provided
        };

        const updatedRecipes = [...recipes, newRecipe];
        dispatch(addRecipe(newRecipe));
        localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes));

        setRecipeName("");
        setRecipeDescription("");
        setRecipeIngredients("");
        setRecipeImage(null);
        setIsRecipeEditing(false);
        alert("Recipe posted successfully!");

        // Optionally: Update the local recipes state to reflect changes immediately
        dispatch(setPostedRecipes(updatedRecipes));
    };

    const handleRemoveRecipe = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);

        dispatch(setPostedRecipes(updatedRecipes));
        localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes));
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="py-8 px-6 md:px-12 flex">
                <div className="hidden md:block w-1/4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl">
                    <div className="flex flex-col space-y-6">
                        {/* Center the image */}
                        <div className="w-full flex justify-center">
                            <img
                                src={image}
                                alt="Avatar"
                                className="w-64 h-78 rounded-2xl object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setIsEditing(true)}
                            />
                        </div>

                        {/* Left-align the rest */}
                        <div className="flex flex-col items-start text-left space-y-1">
                            <h2 className="text-2xl font-didot text-gray-800 dark:text-white">{userName}</h2>
                            <br/>
                            <p className="text-md text-gray-600 dark:text-gray-300">💼 <span className="font-medium">{career}</span></p>
                            <p className="text-md text-gray-600 dark:text-gray-300">📍 <span className="font-medium">{location}</span></p>
                            <p className="text-md text-gray-600 dark:text-gray-300">🎂 <span className="font-medium">{age}</span></p>
                        </div>
                    </div>

                </div>

                <div className="flex-1 max-w-4xl mx-auto">
                    {isEditing && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-4/5 md:w-1/3">
                                <div className="flex flex-col items-start space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Your Profile</h2>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm">
                                            📷 Upload Image
                                        </label>
                                        {image && (
                                            <div className="mt-2">
                                                <img src={image} alt="Profile Preview" className="w-20 h-20 object-cover rounded-xl shadow-md" />
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Career"
                                        value={career}
                                        onChange={(e) => setCareer(e.target.value)}
                                        className="w-full p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm dark:bg-gray-700"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm dark:bg-gray-700"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm dark:bg-gray-700"
                                    />
                                    <div className="flex space-x-4 mt-4">
                                        <button onClick={handleSaveDetails} className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md text-lg">
                                            Save Changes
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition-all shadow-md text-lg">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 max-w-4xl mx-auto">
                        {/* Button to open recipe posting form */}
                        {!isRecipeEditing && (
                            <button
                                onClick={() => setIsRecipeEditing(true)}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md text-lg mb-6"
                            >
                                Post a Recipe
                            </button>
                        )}

                        {/* Recipe Posting Section */}
                        {isRecipeEditing && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-4/5 md:w-1/3">
                                    <div className="flex flex-col items-start space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Post a New Recipe</h2>
                                        {/* Recipe Form */}
                                        <input
                                            type="text"
                                            placeholder="Recipe Name"
                                            value={recipeName}
                                            onChange={(e) => setRecipeName(e.target.value)}
                                            className="w-full p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm dark:bg-gray-700"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={recipeDescription}
                                            onChange={(e) => setRecipeDescription(e.target.value)}
                                            className="w-full p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm dark:bg-gray-700"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Ingredients (comma separated)"
                                            value={recipeIngredients}
                                            onChange={(e) => setRecipeIngredients(e.target.value)}
                                            className="w-full p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm dark:bg-gray-700"
                                        />
                                        <input
                                            type="file"
                                            onChange={(e) => setRecipeImage(URL.createObjectURL(e.target.files[0]))}
                                            className="hidden"
                                            id="recipe-image-upload"
                                        />
                                        <label htmlFor="recipe-image-upload" className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm">
                                            📷 Upload Recipe Image
                                        </label>

                                        {recipeImage && (
                                            <div className="mt-2">
                                                <img src={recipeImage} alt="Recipe Preview" className="w-20 h-20 object-cover rounded-xl shadow-md" />
                                            </div>
                                        )}

                                        <div className="flex space-x-4 mt-4">
                                            <button onClick={handlePostRecipe} className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md text-lg">
                                                Post Recipe
                                            </button>
                                            <button onClick={() => setIsRecipeEditing(false)} className="bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition-all shadow-md text-lg">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Show Recipes */}
                        <div className="space-y-6 mt-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Posted Recipes</h2>
                            <div className="flex flex-wrap gap-6 justify-start">
                                {recipes.map((recipe, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md w-full">
                                        <img src={recipe.image} alt={recipe.name} className="w-full h-60 object-cover rounded-md mb-3" />
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{recipe.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{recipe.description}</p>
                                        <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                                            {Array.isArray(recipe.ingredients)
                                                ? recipe.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)
                                                : recipe.ingredients.split(',').map((ingredient, i) => <li key={i}>{ingredient.trim()}</li>)
                                            }
                                        </ul>
                                        <button onClick={() => handleRemoveRecipe(index)} className="mt-4 text-red-500">Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;