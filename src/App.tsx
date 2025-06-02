import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen"> 
      <Layout />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <Routes location={location}>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
