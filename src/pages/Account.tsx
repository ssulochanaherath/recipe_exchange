// Account.js (or Account.tsx)

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccountDetails } from "../redux/slices/accountSlice";
import Navbar from "../component/Navbar";

// Get userId (or any unique identifier) from localStorage
const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email; // or any unique identifier

const Account = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);

    const [image, setImage] = useState(account.image || "https://i.pravatar.cc/100");
    const [userName, setUserName] = useState(account.name || "");
    const [career, setCareer] = useState(account.career || "");
    const [location, setLocation] = useState(account.location || "");
    const [age, setAge] = useState(account.age || "");
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);

    // Get the current userId from localStorage
    const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.email; // Or any unique identifier

    useEffect(() => {
        if (userId) {
            const savedUser = JSON.parse(localStorage.getItem(`flavor-exchange-state-${userId}`));
            if (savedUser) {
                setUserName(savedUser.name);
                setCareer(savedUser.career);
                setLocation(savedUser.location);
                setAge(savedUser.age);
                setImage(savedUser.image);
            }
        }
    }, [userId]);

    const handleImageUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the base64 string for image
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const saveState = (updatedUser) => {
        // Ensure we're saving the profile with the correct key (userId)
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
            image: file ? image : "https://i.pravatar.cc/100", // Default image if none provided
        };

        // Dispatch action to update Redux store (if you're using it for state management)
        dispatch(setAccountDetails(updatedUser));

        // Save updated user profile to localStorage with unique key (userId)
        saveState(updatedUser);

        setIsEditing(false);
        alert("Profile updated successfully!");
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
                                className="w-64 h-64 rounded-2xl object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setIsEditing(true)}
                            />
                        </div>

                        {/* Left-align the rest */}
                        <div className="flex flex-col items-start text-left space-y-1">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{userName}</h2>
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
                </div>
            </div>
        </div>
    );
};



export default Account;
