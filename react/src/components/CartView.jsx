import React, { useState, useEffect } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import CartItem from "./CartItem";
import "../css/CartView.css";

const CartView = ({
  total,
  savedItems,
  setSavedItems,
  setTotal,
  setDisplayRecommended,
  disableCheckout
}) => {
  const { cart, setCart } = useStoreInfo();

  useEffect(() => {
    setTotal(savedItems.reduce((acc, item) => acc + Number(item.price), 0));
  }, []);

  const isInCart = (itemId) => cart.some((product) => product._id === itemId);
  const isInSavedItems = (itemId) => savedItems.some((product) => product._id === itemId);

  const handleRemove = (toRemove) => {
    setCart((oldCart) => oldCart.filter((item) => item._id !== toRemove._id));
    setSavedItems((oldItems) => oldItems.filter((item) => item._id !== toRemove._id));
    setTotal((old) => old - Number(toRemove.price));
  };

  const handleSaveToCart = (item) => {
    !isInCart(item._id) && setCart((oldCart) => [...oldCart, item]);
    !isInSavedItems(item._id) && setSavedItems((oldItems) => [...oldItems, item]);
    setTotal((old) => old + Number(item.price));
  };

  const handleSaveForLater = (toSave) => {
    setSavedItems((oldItems) => oldItems.filter((item) => item._id !== toSave._id));
    setTotal((old) => old - Number(toSave.price));
  };

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
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
      <h2 className="total">
        Total:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </h2>
      <button
        className="checkout-button"
        onClick={() => setDisplayRecommended(true)}
        disabled={disableCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartView;
