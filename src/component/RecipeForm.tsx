import React from 'react';

const RecipeForm = ({ recipe }: { recipe: any }) => {
    return (
        <div className="p-4 border rounded-md shadow-lg">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover mt-2 rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{recipe.name}</h3>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
                Add to Favorites
            </button>
        </div>
    );
};

export default RecipeForm;
