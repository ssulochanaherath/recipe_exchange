import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import Swal from "sweetalert2";

const RecipeForm = ({ recipe }: { recipe: any }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: any) => state.favorites.favorites);
    const isFavorite = favorites.some((fav: any) => fav.id === recipe.id);

    const onFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isFavorite) {
            dispatch(addFavorite(recipe));
            Swal.fire({
                title: '✨ Added to Favorites',
                text: 'This recipe is now in your favorites!',
                icon: 'success',
                confirmButtonText: 'Nice!',
            });
        } else {
            dispatch(removeFavorite(recipe));
            Swal.fire({
                title: '❌ Removed from Favorites',
                text: 'This recipe was removed from your favorites.',
                icon: 'info',
                confirmButtonText: 'Got it',
            });
        }
    };

    return (
        <div className="hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden bg-white">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-64 object-cover rounded"
            />
            <div className="p-4 flex justify-between items-center">
                <h3 className="text-xl font-semi text-gray-800">{recipe.name}</h3>
                <button
                    onClick={onFavoriteToggle}
                    className="w-8 h-8 flex items-center justify-center border-transparent hover:border-gray-600 rounded-full transition-colors duration-200 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isFavorite ? 'black' : 'none'}
                        stroke="black"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className={`w-6 h-6 transition-transform duration-300 ${isFavorite ? 'scale-125' : 'scale-100'}`}
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
