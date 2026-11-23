
import './Checkout.css';

function Checkout({ cartItems }) {

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout Preview</h2>

      <p className="checkout-message">
        Your order is ready for checkout!
      </p>

      <div className="checkout-card">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
                <div className="checkout-item" key={item.id}>
                    <div>
                    <h4>{item.title}</h4>
                    <p>Author: {item.author}</p>
                    <p>Quantity: {item.quantity}</p>
                    </div>

                    <strong>
                    €{(item.price * item.quantity).toFixed(2)}
                    </strong>
                </div>
            ))}

            <hr />
            <div className="checkout-total">
            <span>Total Items</span>
            <strong>{totalItems}</strong>
            </div>
            <div className="checkout-total">
            <span>Total Amount</span>
            <strong>€{totalPrice.toFixed(2)}</strong>
            </div>

            <button className="place-order-btn" disabled>
            Place Order - Coming Soon
            </button>

            <p className="checkout-note">
            Payment and order placement will be available soon.
            </p>

      </div>
    </div>
  );
}

export default Checkout;
