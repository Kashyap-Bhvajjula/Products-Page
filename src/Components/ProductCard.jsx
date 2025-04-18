import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, cart, updateCart }) => {
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className='w-full h-[150px] rounded-[8px] object-cover ' />
      <h3 className='text-[18px] mt-[10px] mr-0 mb-[5px] ml-0'>{product.name}</h3>
      <p className="text-[#333] font-semibold mb-2.5">₹{product.price}</p>

      {quantity > 0 ? (
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => updateCart(product.id, -1)} 
            className="qty-btn">−</button>
          <span className="text-[16px] min-w-5 text-center">{quantity}</span>
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
