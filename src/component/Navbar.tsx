import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, User } from "lucide-react";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="text-2xl font-extrabold tracking-tight text-green-800 dark:text-green-300">
                <Link to="/" className="hover:opacity-90 transition">Flavor Exchange</Link>
            </div>

            <ul className="flex gap-4 sm:gap-6 items-center text-gray-800 dark:text-gray-200 font-medium text-sm sm:text-base">
                <li>
                    <Link to="/home" className="hover:text-green-600 dark:hover:text-green-400 transition">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/favorites" className="hover:text-green-600 dark:hover:text-green-400 transition">
                        Favorites
                    </Link>
                </li>
                <li>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition-transform"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </li>
                <li>
                    <Link to="/account" className="hover:text-green-600 dark:hover:text-green-400 transition">
                        <User size={18} />
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 hover:scale-110 transition-transform"
                        aria-label="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
