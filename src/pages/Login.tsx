import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        dispatch(setUser(user));

        setEmail("");
        setPassword("");
        setError("");

        Swal.fire({
            title: "Welcome back! 🎉",
            text: "You’ve successfully logged in.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            background: "#f0f4ff",
            color: "#1e293b",
            iconColor: "#10b981", // Tailwind green-500
            position: "center",
            customClass: {
                popup: 'rounded-3xl shadow-xl px-6 pt-8 pb-6',
                title: 'text-2xl font-semibold',
                htmlContainer: 'text-md',
            },
            didOpen: () => {
                const popup = Swal.getPopup();
                popup.classList.add('animate__animated', 'animate__fadeInDown');
            },
        });
        navigate("/home");
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
