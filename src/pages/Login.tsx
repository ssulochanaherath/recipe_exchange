import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/home");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('images/login.jpg')" }}
        >
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm bg-opacity-80">
                <h2 className="text-4xl font-bold text-center text-green-800 mb-8">Flavor Exchange</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full mt-1 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full mt-1 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl transition duration-300 hover:from-green-700 hover:to-green-800"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-green-600 hover:underline font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
