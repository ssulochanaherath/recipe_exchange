import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useDispatch } from "react-redux"; // Import useDispatch to use Redux
import { setUser } from "../redux/slices/authSlice"; // Adjust the import path based on your project structure

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Error state for invalid login
    const dispatch = useDispatch();  // To dispatch actions to Redux store
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find the user matching the entered email and password
        const user = users.find(u => u.email === email && u.password === password);

        // If no matching user found, show error
        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        // Save the logged-in user to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Dispatch the setUser action to store the user in Redux (optional if using Redux for user state)
        dispatch(setUser(user));

        // Clear form fields after successful login
        setEmail("");
        setPassword("");
        setError(""); // Clear any existing error

        // Redirect to the user's account or home page
        alert("Login successful!");
        navigate("/account");  // Redirect to the account page (adjust if needed)
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
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight">Log In</h2>

                    {/* Show error message if any */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-5 rounded-lg shadow-lg transform transition-all duration-300"
                    >
                        Log In
                    </button>

                    <p className="text-center text-sm text-black">
                        Don't have an account? <a href="/signup" className="text-indigo-800 hover:underline">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
