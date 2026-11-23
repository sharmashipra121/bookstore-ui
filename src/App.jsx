
import { useState, useEffect, useCallback } from 'react';
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

import {
  clearAuthCredentials,
  getCart,
  addBookToCart,
  updateCartQuantity,
  removeBookFromCart
} from './services/AuthService';

import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const navigate = useNavigate();

  const updateCartState = (cartResponse) => {
    const items = cartResponse.items.map(item => ({
      id: item.bookId,
      cartItemId: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal
    }));

    setCartItems(items);
  };

  const fetchCart = useCallback(async () => {
    try {
      setCartLoading(true);

      const response = await getCart();
      updateCartState(response);

    } catch (error) {
      console.error('Unable to fetch cart:', error);
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn, fetchCart]);

  const addToCart = async (book) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const response = await addBookToCart(book.id, 1);
      updateCartState(response);
    } catch (error) {
      console.error('Unable to add book:', error);
      alert(error.message);
    }
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const updateQuantity = async (bookId, change) => {
    if (!isLoggedIn) return;

    const currentItem = cartItems.find(
      item => item.id === bookId
    );

    if (!currentItem) return;

    const newQuantity = currentItem.quantity + change;

    try {
      if (newQuantity <= 0) {
        await removeBookFromCart(bookId);
        setCartItems(prevItems =>
          prevItems.filter(item => item.id !== bookId)
        );
      } else {
        const response = await updateCartQuantity(
          bookId,
          newQuantity
        );

        updateCartState(response);
      }
    } catch (error) {
      console.error('Unable to update cart:', error);
      alert(error.message);
    }
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
    setCartItems([]);
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
