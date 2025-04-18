import React, { useState, useRef, useEffect } from 'react';
import CartDropdown from './CartDropdown';
import './Navbar.css';

const Navbar = ({ cart, updateQuantity, removeFromCart }) => {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef();

  const toggleCart = () => setShowCart((prev) => !prev);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex text-2xl text-red-500 bg-[#333] items-center justify-between pt-4 pb-4 pl-5 pr-5">
      <h1 className='cursor-pointer'>🛍️ eShop</h1>
      <div className="cart-icon-wrapper" ref={cartRef} onClick={toggleCart} style={{ color: showCart ? '#000' : 'black' }}>
        🛒<span className="cart-count">{totalItems}</span>
        {showCart && (
          <CartDropdown cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;