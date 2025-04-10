import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountDetails } from "../redux/slices/accountSlice";
import Navbar from "../component/Navbar";
import { addRecipe, setPostedRecipes } from "../redux/slices/recipeSlice";
import { RootState } from '../redux/store.ts'; // adjust path based on your setup

const Account = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const recipes = useSelector((state: RootState) => state.recipes);

    const [image, setImage] = useState(account.image || "https://i.pravatar.cc/100");
    const [userName, setUserName] = useState(account.name || "");
    const [career, setCareer] = useState(account.career || "");
    const [location, setLocation] = useState(account.location || "");
    const [age, setAge] = useState(account.age || "");
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);

    // Recipe state for editing
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeImage, setRecipeImage] = useState(null);
    const [isRecipeEditing, setIsRecipeEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const [recipeToEdit, setRecipeToEdit] = useState(null);

    // Get the current userId from localStorage
    const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email; // Or any unique identifier

    useEffect(() => {
        if (userId) {
            // Load profile data from localStorage
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

            // Load recipes from localStorage
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

    const handleAddRecipe = () => {
        // Reset the form and set modal to "Add Recipe" mode
        setIsEditing(false);
        setRecipeName('');
        setRecipeDescription('');
        setRecipeIngredients('');
        setRecipeImage(null);
        setIsRecipeEditing(true); // Open modal for adding new recipe
    };

    const handleImageUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string; // Base64 string for the image
                setImage(imageUrl); // Save the base64 image URL to state for the profile image

                // Save the image to localStorage along with other user details
                saveState({ ...account, image: imageUrl });
            };
            reader.readAsDataURL(uploadedFile); // Read the file as base64
        }
    };

    const handleRecipeImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setRecipeImage(reader.result as string); // Store base64 image string
            };
            reader.readAsDataURL(file); // Convert the image to base64
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

        // Dispatch action to update Redux store (if you're using it for state management)
        dispatch(setAccountDetails(updatedUser));

        // Save updated user profile to localStorage with unique key (userId)
        saveState(updatedUser);

        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const saveState = (updatedUser) => {
        // Ensure we're saving the profile with the correct key (userId)
        if (userId) {
            localStorage.setItem(`flavor-exchange-state-${userId}`, JSON.stringify(updatedUser));
        }
    };

    // Handle recipe posting
    const handlePostRecipe = () => {
        const newRecipe = {
            name: recipeName,
            description: recipeDescription,
            ingredients: recipeIngredients.split(',').map(i => i.trim()), // Converts to array
            image: recipeImage || "https://via.placeholder.com/150", // Default image if none provided
        };

        // Save updated recipes to localStorage
        const updatedRecipes = [...recipes, newRecipe];
        dispatch(addRecipe(newRecipe)); // Redux action to add the recipe
        localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes)); // Save to localStorage

        // Clear the form and reset state
        setRecipeName("");
        setRecipeDescription("");
        setRecipeIngredients("");
        setRecipeImage(null);
        setIsRecipeEditing(false);
        alert("Recipe posted successfully!");

        // Optionally: Update the local recipes state to reflect changes immediately
        dispatch(setPostedRecipes(updatedRecipes));
    };

    // Handle edit for recipes
    const handleEditRecipe = (index) => {
        const recipe = recipes[index];
        setRecipeToEdit(recipe); // Set the recipe to edit
        setRecipeName(recipe.name);
        setRecipeDescription(recipe.description);
        setRecipeIngredients(recipe.ingredients.join(", "));
        setRecipeImage(recipe.image); // Pre-fill the image if available
        setEditingIndex(index); // ✅ set the editing index
        setIsEditing(true); // Set to "Edit Recipe" mode
        setIsRecipeEditing(true); // Open modal
    };

    const handleSaveRecipe = () => {
        if (isEditing) {
            // Edit existing recipe
            const updatedRecipe = {
                ...recipeToEdit,
                name: recipeName,
                description: recipeDescription,
                ingredients: recipeIngredients.split(',').map(i => i.trim()), // Converts to array
                image: recipeImage || "https://via.placeholder.com/150", // Default image if none provided
            };

            const updatedRecipes = recipes.map((r) =>
                r === recipeToEdit ? updatedRecipe : r // Replace the old recipe with the updated one
            );

            dispatch(setPostedRecipes(updatedRecipes));

            localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes));
        } else {
            // Add new recipe
            const newRecipe = {
                id: Date.now(),
                name: recipeName,
                description: recipeDescription,
                ingredients: recipeIngredients.split(',').map(i => i.trim()),
                image: recipeImage || "https://via.placeholder.com/150",
            };

            const updatedRecipes = [...recipes, newRecipe];
            dispatch(setPostedRecipes(updatedRecipes));
            localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes));
        }

        // Reset form and close modal
        setRecipeToEdit(null);
        setRecipeName("");
        setRecipeDescription("");
        setRecipeIngredients("");
        setRecipeImage(null);
        setIsRecipeEditing(false);
        alert(isEditing ? "Recipe updated successfully!" : "Recipe added successfully!");
    };

    // Function to remove a recipe by index
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
                            <br />
                            <p className="text-md text-gray-600 dark:text-gray-300">💼 <span className="font-medium">{career}</span></p>
                            <p className="text-md text-gray-600 dark:text-gray-300">📍 <span className="font-medium">{location}</span></p>
                            <p className="text-md text-gray-600 dark:text-gray-300">🎂 <span className="font-medium">{age}</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-4xl mx-auto">
                    {/* Button to open recipe posting form */}
                    {!isRecipeEditing && (
                        <button
                            onClick={() => setIsRecipeEditing(true)} // This will open the form for posting a new recipe
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md text-lg mb-6"
                        >
                            Post a Recipe
                        </button>
                    )}

                    {/* Recipe Posting Form */}
                    {isRecipeEditing && !isEditing && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-4/5 md:w-1/3">
                                <div className="flex flex-col items-start space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Recipe</h2>
                                    {/* Post Recipe Form */}
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
                                        onChange={handleRecipeImageUpload}
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
                                        <button
                                            onClick={handlePostRecipe} // Post new recipe for adding mode
                                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md text-lg"
                                        >
                                            Post Recipe
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsRecipeEditing(false); // Close the modal
                                                // Clear input fields when canceling
                                                setRecipeName('');
                                                setRecipeDescription('');
                                                setRecipeIngredients('');
                                                setRecipeImage(null);
                                            }}
                                            className="bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition-all shadow-md text-lg"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recipe Edit Form */}
                    {isRecipeEditing && isEditing && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-4/5 md:w-1/3">
                                <div className="flex flex-col items-start space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Recipe</h2>
                                    {/* Edit Recipe Form */}
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
                                        onChange={handleRecipeImageUpload}
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
                                        <button
                                            onClick={handleSaveRecipe} // Save changes for editing mode
                                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md text-lg"
                                        >
                                            Save Changes
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsRecipeEditing(false); // Close the modal
                                                setRecipeName('');
                                                setRecipeDescription('');
                                                setRecipeIngredients('');
                                                setRecipeImage(null);
                                            }}
                                            className="bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition-all shadow-md text-lg"
                                        >
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

                        <div className="flex flex-col space-y-6">
                            {recipes.map((recipe, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                                    {recipe.image && (
                                        <img src={recipe.image} alt={recipe.name} className="w-full h-60 object-cover rounded-md mb-3" />
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{recipe.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{recipe.description}</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                                        {Array.isArray(recipe.ingredients)
                                            ? recipe.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)
                                            : recipe.ingredients.split(',').map((ingredient, i) => <li key={i}>{ingredient.trim()}</li>)
                                        }
                                    </ul>
                                    <button
                                        onClick={() => handleEditRecipe(index)}
                                        className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleRemoveRecipe(index)}
                                        className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Account;
