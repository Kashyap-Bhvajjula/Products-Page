import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, cart, updateCart }) => {
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>

      {quantity > 0 ? (
        <div className="quantity-controls">
          <button onClick={() => updateCart(product.id, -1)} className="qty-btn">−</button>
          <span className="qty">{quantity}</span>
          <button onClick={() => updateCart(product.id, 1)} className="qty-btn">+</button>
        </div>
      ) : (
        <button className="add-btn" onClick={() => updateCart(product.id, 1)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
