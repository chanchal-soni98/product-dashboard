import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { setSearchTerm, setCategory, setSortDirection } from '../store/slices/filtersSlice';
import type { SortDirection } from '../types/product';
import { Loader } from 'lucide-react';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector(state => state.products);
  const favorites = useAppSelector(state => state.favorites.items);
  const filters = useAppSelector(state => state.filters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
    )
    .filter(product =>
      filters.category ? product.category === filters.category : true
    )
    .sort((a, b) => {
      if (filters.sortDirection === 'asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });

  if (status === 'loading') {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}


  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <button
          onClick={() => {
            const newDirection: SortDirection =
              filters.sortDirection === 'asc' ? 'desc' : 'asc';
            dispatch(setSortDirection(newDirection));
          }}
          className="w-full md:w-1/4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all"
        >
          Price: {filters.sortDirection === 'asc' ? '↑ Low to High' : '↓ High to Low'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const isFavorite = favorites.some(f => f.id === product.id);

          return (
            <div
              key={product.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2">{product.title}</h2>
              <p className="text-violet-600 font-bold mb-4">${product.price}</p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    if (isFavorite) {
                      dispatch(removeFromFavorites(product.id));
                    } else {
                      dispatch(addToFavorites(product));
                    }
                  }}
                  className={`text-xl transition ${
                    isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  {isFavorite ? <div className="animate-bounce">❤️</div> : '🤍'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
