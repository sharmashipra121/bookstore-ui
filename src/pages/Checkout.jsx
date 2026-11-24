
import './Checkout.css';
import { formatEuro, getCartTotals } from '../utils/cart';

function Checkout({ cartItems }) {
  const { itemCount, totalPrice } = getCartTotals(cartItems);

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
                    {formatEuro(item.price * item.quantity)}
                    </strong>
                </div>
            ))}

            <hr />
            <div className="checkout-total">
            <span>Total Items</span>
            <strong>{itemCount}</strong>
            </div>
            <div className="checkout-total">
            <span>Total Amount</span>
            <strong>{formatEuro(totalPrice)}</strong>
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
