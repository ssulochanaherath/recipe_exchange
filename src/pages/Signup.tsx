import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorState] = useState(""); // Define the error state
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!name || !email || !password) {
            setErrorState("Please fill in all fields.");
            return;
        }

        // Create a new user object
        const newUser = { name, email, password };

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the email already exists in the users array
        if (users.some((user) => user.email === email)) {
            setErrorState("Email is already registered.");
            return;
        }

        // Add new user to the users array
        users.push(newUser);

        // Save the updated users array to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Dispatch the setUser action to store the user in Redux and localStorage
        dispatch(setUser(newUser));

        // Clear error state and show success message
        setErrorState("");
        alert("Signup successful!");

        // Clear form fields after successful signup
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="relative h-screen bg-gradient-to-r from-indigo-600 to-blue-500 overflow-auto">
            <div
                className="fixed inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/login.jpg')",
                }}
            ></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/70 backdrop-blur-xl text-gray-800 rounded-3xl shadow-lg p-10 w-full max-w-md space-y-8 transform transition-all ease-in-out duration-300"
                >
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight">Create Account</h2>

                    {/* Display error message if any */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full p-4 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-900"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-4 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-900"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-4 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-900"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-5 rounded-lg shadow-lg transform transition-all duration-300"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-black">
                        Already have an account? <a href="/login" className="text-indigo-800 hover:underline">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
