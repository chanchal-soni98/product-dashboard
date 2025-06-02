import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromFavorites } from '../store/slices/favoritesSlice';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);

  if (favorites.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">

      <div className="text-7xl animate-bounce mb-6">🤍</div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Favorites Yet
      </h2>

      <p className="text-gray-500 mb-6 max-w-md">
        Explore products and add them to your list!
      </p>

      <Link 
        to="/" 
        className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
      >
        Add Products
      </Link>
    </div>
  );
}


  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Favorites</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-contain mb-4"
            />

            <h2 className="text-lg font-semibold mb-1 text-gray-900">{product.title}</h2>
            <p className="text-violet-600 text-md font-medium mb-4">${product.price}</p>

            <div className="mt-auto flex gap-2">
              <Link 
                to={`/product/${product.id}`}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded transition text-center"
              >
                View
              </Link>
              <button
                onClick={() => dispatch(removeFromFavorites(product.id))}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm px-4 py-2 rounded transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
