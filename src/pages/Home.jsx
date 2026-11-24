
import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';
import './Home.css';

const API_BASE_URL = 'http://localhost:8080';
const PAGE_SIZE = 20;

function Home({ onAddToCart, cartItems = [], onUpdateQuantity }) {

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${API_BASE_URL}/books?page=${page}&size=${PAGE_SIZE}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.content)) {
          throw new Error('Invalid books API response');
        }

        setBooks(data.content);
        setTotalPages(data.page.totalPages);
        setTotalElements(data.page.totalElements);

      } catch (error) {
        console.error('Fetch Books Error:', error);
        setError('Unable to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">

      <h2>Available Books</h2>

      <p className="pagination-info">
        Showing {books.length} books on this page
        out of {totalElements} books
      </p>

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

      {totalPages > 1 && (
        <div className="pagination">

          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Home;
