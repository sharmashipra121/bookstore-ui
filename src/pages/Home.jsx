import books from '../data/books';
import BookCard from '../components/BookCard';

function Home() {
    return (
        <div>
            <h2>Welcome to Online Bookstore</h2>
            <p>Explore our collection of books</p>

            <div>
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
        </div>
    );
}

export default Home;
