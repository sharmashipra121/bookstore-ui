function BookCard({ book }) {
    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <h4>Price: €{book.price}</h4>

            <button>Add to Cart</button>
        </div>
    );
}

export default BookCard;
