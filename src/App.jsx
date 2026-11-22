import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import './App.css';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

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

  const updateQuantity = (bookId, change) => {
    setCartItems(prevItems =>
        prevItems
            .map(item =>
                item.id === bookId
                    ? {
                        ...item,
                        quantity: item.quantity + change
                    }
                    : item
            )
            .filter(item => item.quantity > 0)
    );
  };

  return (
    <BrowserRouter>
      <div className="app-container">

        <Header />

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

            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            <Route
                path="/cart"
                element={
                    <Cart
                        cartItems={cartItems}
                        onUpdateQuantity={updateQuantity}
                    />
                }
            />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
