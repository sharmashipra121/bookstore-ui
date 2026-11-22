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

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data);

      } catch (error) {
        setError('Unable to load books. Please try again.');
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
