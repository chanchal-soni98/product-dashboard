import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProductById } from '../store/slices/productsSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { Heart, HeartOff, Loader } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );
  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorite = product ? favorites.some(f => f.id === product.id) : false;

  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  if (!product) {
    return <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-700 transition font-medium"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-[350px] h-[350px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-md mb-6 leading-relaxed">{product.description}</p>
          <p className="text-2xl font-bold text-violet-600 mb-6">${product.price}</p>

          <button
            onClick={() => {
              if (isFavorite) {
                dispatch(removeFromFavorites(product.id));
              } else {
                dispatch(addToFavorites(product));
              }
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
              isFavorite
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
            }`}
          >
            {isFavorite ? <HeartOff className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
