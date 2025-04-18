import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import shirtImg from "../Images/shirt.avif";
import bikeImg from "../Images/bike.avif";
import capImg from "../Images/cap.jpeg";
import ps5Img from "../Images/ps5.jpeg";
import shoesImg from "../Images/shoes.jpg";
import watchImg from "../Images/watch.jpg";

const Home = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const navigate = useNavigate();

  const sampleProducts = [
    { id: 1, name: "T-Shirt", price: 20, image: shirtImg },
    { id: 2, name: "Sneakers", price: 60, image: shoesImg },
    { id: 3, name: "Cap", price: 15, image: capImg },
    { id: 4, name: "Watch", price: 100, image: watchImg },
    { id: 5, name: "PlayStation 5", price: 600, image: ps5Img },
    { id: 6, name: "Karizma XMR", price: 6000, image: bikeImg },
  ];

  const updateCart = (productId, delta) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prevCart.filter((item) => item.id !== productId);
        }
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        );
      } else {
        const product = sampleProducts.find((p) => p.id === productId);
        if (product) {
          setTriggerAnimation(true);
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart;
      }
    });
  };

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleProceedToPayment = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    navigate("/payment", { state: { totalAmount: total } });
  };

  return (
    <div className="home-container">
      <Navbar
        cart={cart}
        updateQuantity={updateCart}
        removeFromCart={(id) => updateCart(id, -Infinity)}
        triggerAnimation={triggerAnimation}
        handleProceedToPayment={handleProceedToPayment}
      />
      <div className="flex flex-wrap gap-4 justify-center p-5">
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            updateCart={updateCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
