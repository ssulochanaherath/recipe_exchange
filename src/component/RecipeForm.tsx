import React, { useState } from 'react';

const RecipeForm = ({ recipe }: { recipe: any }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    return (
        <div className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden bg-white">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4 flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800">{recipe.name}</h3>
                <button
                    onClick={handleFavoriteToggle}
                    className="w-8 h-8 flex items-center justify-center border-2 border-transparent hover:border-gray-600 rounded-full transition-colors duration-200 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isFavorite ? 'black' : 'none'} // Only the heart is filled in black
                        stroke="black"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 transition-colors duration-200"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default RecipeForm;
