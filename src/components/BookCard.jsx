import './BookCard.css';

function BookCard({
    book,
    onAddToCart,
    quantity,
    onUpdateQuantity
}) {
    const hasQuantity = quantity > 0;

    return (
        <div className="book-card">

            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <h4>Price: €{book.price}</h4>

            {!hasQuantity ? (
                <button onClick={() => onAddToCart(book)}>
                    Add to Cart
                </button>
            ) : (
                <div className="quantity-controls">
                    <button
                        onClick={() => onUpdateQuantity(book.id, -1)}
                    >
                        -
                    </button>

                    <span>{quantity}</span>
                    <button
                        onClick={() => onUpdateQuantity(book.id, 1)}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default BookCard;
