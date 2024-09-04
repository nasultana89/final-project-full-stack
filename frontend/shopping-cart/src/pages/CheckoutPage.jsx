
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, updateCartQuantity } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Default payment method

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleCheckout = () => {
    // Create order object to send to the backend
    const orderData = {
      user: "user-id-here", 
      products: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod, // Add selected payment method
      status: 'pending',
    };

    console.log('Proceeding to checkout with order data:', orderData);
    
   
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <div>
                <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCartQuantity(item._id, parseInt(e.target.value))}
                  min="1"
                  style={{ width: '50px', textAlign: 'center' }}
                />
                <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart</p>
      )}

      <h3>Select Payment Method:</h3>
      <div>
        <label>
          <input
            type="radio"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            value="cash_on_delivery"
            checked={paymentMethod === 'cash_on_delivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <p>Total: ${totalAmount.toFixed(2)}</p>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;