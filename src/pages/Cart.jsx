import './Cart.css';
import { formatEuro, getCartTotals } from '../utils/cart';

function Cart({ cartItems, onUpdateQuantity, onProceedCheckout }) {
    const { itemCount, totalPrice } = getCartTotals(cartItems);

    if (cartItems.length === 0) {
        return (
            <div className="cart-container empty-cart">
                <h2>Your Shopping Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="cart-container">

            <h2>Your Shopping Cart</h2>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-book-details">
                                <h3>{item.title}</h3>
                                <p>Author: {item.author}</p>
                                <p>Price: {formatEuro(item.price)}</p>
                            </div>

                            <div className="cart-quantity">
                                <button
                                    onClick={() =>
                                        onUpdateQuantity(item.id, -1)
                                    }
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        onUpdateQuantity(item.id, 1)
                                    }
                                >
                                    +
                                </button>

                            </div>
                            <div className="cart-subtotal">
                                <strong>
                                    {formatEuro(item.price * item.quantity)}
                                </strong>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Total Items</span>
                        <span>
                            {itemCount}
                        </span>
                    </div>

                    <div className="summary-row total">
                        <span>Total Price</span>
                        <strong>{formatEuro(totalPrice)}</strong>
                    </div>

                    <button
                        className="checkout-btn"
                        onClick={onProceedCheckout}
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
