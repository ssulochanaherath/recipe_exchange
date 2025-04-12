import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountDetails } from "../redux/slices/accountSlice";
import Navbar from "../component/Navbar";
import { addRecipe, setPostedRecipes, editRecipe } from "../redux/slices/recipeSlice";
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

    const [isRecipeEditting, setIsRecipeEditingForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        ingredients: '',
        image: '',
    });

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
            id: Date.now(),
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

        dispatch(setPostedRecipes(updatedRecipes));
    };

    const handleRemoveRecipe = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);

        dispatch(setPostedRecipes(updatedRecipes));
        localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes));
    };

    const handleEditRecipe = (index: number) => {
        const recipeToEdit = recipes[index];
        setEditingIndex(index);
        setFormData({ ...recipeToEdit });
        setIsRecipeEditingForm(true);
    };

    const handleSaveEditedRecipe = () => {
        if (editingIndex === null) return;

        // Replace the recipe at editingIndex with updated formData
        const updatedRecipes = recipes.map((recipe, index) =>
            index === editingIndex ? { ...formData } : recipe
        );

        dispatch(setPostedRecipes(updatedRecipes));
        localStorage.setItem(`recipes-${userId}`, JSON.stringify(updatedRecipes));

        setEditingIndex(null);
        setFormData({
            id: '',
            name: '',
            description: '',
            ingredients: '',
            image: '',
        });
        setIsRecipeEditingForm(false);
    };



    const cancelEditRecipe = () => {
        setIsRecipeEditingForm(false);
    };



    const handleRecipeImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            resizeImage(file, 400, 400, (base64Image) => {
                setFormData((prev) => ({ ...prev, image: base64Image }));
            });
        }
    };


    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
                callback(resizedBase64);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
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

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    const base64Image = reader.result;
                                                    setFormData((prev) => ({ ...prev, image: base64Image }));
                                                };
                                                if (file) reader.readAsDataURL(file);
                                            }}
                                        />



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

                        {/* Recipe editing form */}
                        {isRecipeEditting && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4">Edit Recipe</h2>

                                    <input
                                        type="text"
                                        placeholder="Recipe Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-2 mb-2 border rounded"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-2 mb-2 border rounded"
                                    />
                                    <textarea
                                        placeholder="Ingredients (comma-separated)"
                                        value={formData.ingredients}
                                        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                                        className="w-full p-2 mb-2 border rounded"
                                    />

                                    <input
                                        type="file"
                                        onChange={handleRecipeImageUpload}
                                        className="hidden"
                                        id="recipe-image-upload"
                                    />
                                    <label htmlFor="recipe-image-upload" className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm">
                                        📷 Change Image
                                    </label>
                                    {formData.image && (
                                        <img src={formData.image} alt="Recipe Preview" className="w-20 h-20 object-cover rounded-xl shadow-md mt-2" />
                                    )}

                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={cancelEditRecipe}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveEditedRecipe}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                        >
                                            Save Changes
                                        </button>
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
                                        <div className="flex gap-4 mt-4">
                                            <button onClick={() => handleEditRecipe(index)} className="text-blue-500">Edit</button>
                                            <button onClick={() => handleRemoveRecipe(index)} className="text-red-500">Remove</button>
                                        </div>
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