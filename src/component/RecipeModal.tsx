import React from 'react';

interface ModalProps {
    isOpen: boolean;
    recipe: any;
    closeModal: () => void;
}

const RecipeModal: React.FC<ModalProps> = ({ isOpen, recipe, closeModal }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
                >
                    ×
                </button>
                <div className="flex flex-col md:flex-row">
                    {/* Left side for image */}
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                    {/* Right side for text content */}
                    <div className="md:w-2/3 md:pl-6">
                        <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
                        <p className="text-gray-700 mb-4">
                            <strong>Description:</strong> {recipe.description}
                        </p>
                        <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                        <ul className="list-disc pl-5 text-gray-700 mb-4">
                            {recipe.ingredients.map((ingredient: string, index: number) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <button
                            onClick={closeModal}
                            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
