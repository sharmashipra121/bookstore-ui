
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate
} from 'react-router-dom';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { clearAuthCredentials } from './services/AuthService';

import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingBook = prevItems.find(
        item => item.id === book.id
      );

      if (existingBook) {
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const updateQuantity = (bookId, change) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === bookId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleProceedCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/login', {
        state: { from: '/checkout' }
      });
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearAuthCredentials();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="app-container">

      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        cartCount={cartCount}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={addToCart}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
              />
            }
          />

          <Route
            path="/login"
            element={
              isLoggedIn
                ? <Navigate to="/" replace />
                : <Auth onLoginSuccess={handleLoginSuccess} />
            }
          />

          <Route
            path="/register"
            element={
              isLoggedIn
                ? <Navigate to="/" replace />
                : <Auth onLoginSuccess={handleLoginSuccess} />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onProceedCheckout={handleProceedCheckout}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              isLoggedIn
                ? <Checkout cartItems={cartItems} />
                : <Navigate
                    to="/login"
                    state={{ from: '/checkout' }}
                    replace
                  />
            }
          />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
