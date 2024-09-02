
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; // Use the Cart context

const CheckoutPage = () => {
  const { cart } = useCart(); // Access cart state
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount whenever the cart changes
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleCheckout = () => {
    console.log('Proceeding to checkout with cart:', cart);
    // Further checkout logic goes here (e.g., creating an order)
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart</p>
      )}
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
