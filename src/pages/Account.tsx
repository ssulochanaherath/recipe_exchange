import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";

const Account = () => {
    const [image, setImage] = useState("");
    const [userName, setUserName] = useState("");
    const [career, setCareer] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [isEditing, setIsEditing] = useState(false); // To toggle the modal for editing
    const [file, setFile] = useState(null); // To hold the uploaded file

    // Fetching data from localStorage on component mount
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            setUserName(loggedInUser.name);
            setCareer(loggedInUser.career || "");
            setLocation(loggedInUser.location || "");
            setAge(loggedInUser.age || "");
            setImage(loggedInUser.image || "https://i.pravatar.cc/100"); // Default image if none is set
        }
    }, []);

    const handleImageUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the base64 string
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const handleSaveDetails = () => {
        const updatedUser = {
            name: userName,
            career,
            location,
            age,
            image: file ? image : "https://i.pravatar.cc/100", // Save the updated image or fallback image
        };

        // Save updated user data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

        setIsEditing(false); // Close the modal after saving
        alert("Profile updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="py-8 px-6 md:px-12 flex">
                {/* Sidebar */}
                <div className="hidden md:block w-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                    <div className="flex flex-col items-center space-y-6">
                        <img
                            src={image}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full object-cover"
                            onClick={() => setIsEditing(true)} // Open the modal when image is clicked
                        />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{userName}</h2>
                        {/* Display Career, Location, and Age */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">Career: {career}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location: {location}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Age: {age}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 max-w-4xl mx-auto">
                    {/* Modal for Editing Image and Details */}
                    {isEditing && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-4/5 md:w-1/3">
                                <div className="flex flex-col items-start space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        Edit Your Profile
                                    </h2>

                                    {/* Image Upload */}
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="cursor-pointer bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all"
                                        >
                                            📷 Upload Image
                                        </label>
                                        {image && (
                                            <div className="mt-2">
                                                <img
                                                    src={image}
                                                    alt="Profile Preview"
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Career, Location, Age Inputs */}
                                    <input
                                        type="text"
                                        placeholder="Career"
                                        value={career}
                                        onChange={(e) => setCareer(e.target.value)}
                                        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md dark:bg-gray-700"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md dark:bg-gray-700"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md dark:bg-gray-700"
                                    />

                                    {/* Save and Cancel Buttons */}
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={handleSaveDetails}
                                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-all shadow-md"
                                        >
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
