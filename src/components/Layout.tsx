import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const Layout = () => {
  const favorites = useAppSelector(state => state.favorites.items);
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-violet-600 tracking-tight hover:text-violet-700 transition"
        >
          Shop<span className="text-gray-800">Ease</span>
        </Link>
        <nav className="flex items-center gap-8 text-md font-medium">
          <Link
            to="/"
            className={`relative transition text-gray-700 hover:text-violet-600 ${
              location.pathname === '/' ? 'text-violet-600 font-semibold' : ''
            }`}
          >
            Home
            {location.pathname === '/' && (
              <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-violet-600 rounded-full" />
            )}
          </Link>

          <Link
            to="/favorites"
            className={`relative flex items-center gap-1 text-gray-700 hover:text-violet-600 transition ${
              location.pathname === '/favorites' ? 'text-violet-600 font-semibold' : ''
            }`}
          >
             {favorites.length!=0 ? '❤️' : '🤍'}
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Layout;
