import React, { useState, useEffect } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import CartItem from "./CartItem";
import "../css/CartView.css";

const CartView = () => {
  const { cart, setCart } = useStoreInfo();
  const [savedItems, setSavedItems] = useState(cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(savedItems.reduce((acc, item) => acc + Number(item.price), 0));
  }, [savedItems]);

  const isInCart = (itemId) => cart.some((product) => product._id === itemId);

  const handleRemove = (itemId) => {
    setCart((oldCart) => oldCart.filter((item) => item._id !== itemId));
    setSavedItems((oldItems) => oldItems.filter((item) => item._id !== itemId));
  };

  const handleSaveToCart = (item) => {
    !isInCart(item._id) && setCart((oldCart) => [...oldCart, item]);
    setSavedItems((oldItems) => [...oldItems, item]);
  };

  const handleSaveForLater = (itemId) => {
    setSavedItems((oldItems) => oldItems.filter((item) => item._id !== itemId));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cart</h2>
      <div className="row">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onRemove={handleRemove}
            onSaveForLater={handleSaveForLater}
            onSaveToCart={handleSaveToCart}
            isInCart={isInCart}
          />
        ))}
      </div>
      <h2>Total: {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}</h2>
    </div>
  );
};

export default CartView;
