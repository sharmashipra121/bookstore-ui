import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';
import { getAuthHeader } from '../services/AuthService';

import './Home.css';

function Home({ onAddToCart, cartItems, onUpdateQuantity }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/books',
        {
          headers: {
            ...getAuthHeader()
          }
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          `API failed with status: ${response.status}`
        );
      }

      const data = JSON.parse(responseText);

      if (!data || !Array.isArray(data.content)) {
      throw new Error('Expected an array inside data.content');
    }

      setBooks(data.content);

    } catch (error) {
      console.error('Fetch Books Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    fetchBooks();

  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">
      <h2>Available Books</h2>

      <div className="book-list">
        {books.map(book => {
            const cartItem = cartItems.find(
                item => item.id === book.id
            );

            return (
                <BookCard
                    key={book.id}
                    book={book}
                    onAddToCart={onAddToCart}
                    quantity={cartItem ? cartItem.quantity : 0}
                    onUpdateQuantity={onUpdateQuantity}
                />
            );
        })}
      </div>
    </div>
  );
}

export default Home;
