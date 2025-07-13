import React, { useState, useEffect } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import CartItem from "./CartItem";
import Alert from "./Alert";
import "../css/CartView.css";

const CartView = ({
  savedItems,
  setSavedItems,
  setDisplayRecommended,
  displayBilling,
}) => {
  const { user, cart, setCart, total, setTotal } = useStoreInfo();
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    console.log(cart);
    setTotal(cart.reduce((acc, item) => acc + Number(item.price), 0));
  }, []);

  const isInCart = (itemId) => cart.some((product) => product._id === itemId);
  const isInSavedItems = (itemId) =>
    savedItems.some((product) => product._id === itemId);

  const handleRemove = (toRemove) => {
    setCart((oldCart) => oldCart.filter((item) => item._id !== toRemove._id));
    // setSavedItems((oldItems) => oldItems.filter((item) => item._id !== toRemove._id));
    setTotal((old) => old - Number(toRemove.price));
  };

  const handleSaveToCart = (item) => {
    !isInCart(item._id) && setCart((oldCart) => [...oldCart, item]);
    setSavedItems((oldItems) => oldItems.filter((i) => i._id !== item._id));
    setTotal((old) => old + Number(item.price));
  };

  const handleSaveForLater = (toSave) => {
    setSavedItems((oldItems) => [...oldItems, toSave]);
    setTotal((old) => old - Number(toSave.price));
  };

  const handleCheckout = () => {
    if (user) {
      setDisplayRecommended(true);
    } else {
      setDisplayAlert(true);
    }
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
            isSavedForLater={isInSavedItems(item)}
            disableButton={displayBilling}
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
        onClick={handleCheckout}
        disabled={displayBilling || total === 0}
      >
        Checkout
      </button>
      {displayAlert && (
        <Alert
          message={"Please sign in before proceeding to checkout"}
          onClose={() => setDisplayAlert(false)}
          type={"bad"}
        />
      )}
    </div>
  );
};

export default CartView;
