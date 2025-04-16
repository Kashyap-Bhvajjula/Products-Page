import React from 'react';
import './CartDropdown.css';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToPayment = (e) => {
    e.stopPropagation();
    navigate('/payment', { state: { totalAmount } });
  };

  const handleClickInside = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className="cart-dropdown" onClick={handleClickInside}>
      <h4>Your Cart</h4>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-price">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</div>
              </div>
              <div className="item-actions">
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <div className="total">Total: ₹{totalAmount}</div>
          <button className="pay-btn" onClick={handleProceedToPayment}>Go to Payment</button>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
