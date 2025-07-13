import React, { useState } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import "../css/NameDialog.css"; // Import the CSS file

const NameDialog = ({setOpen}) => {
  const [inputName, setInputName] = useState("");
  const { setUser, cart, setCart, setOrders } = useStoreInfo();
  const isInCart = (data) => cart.some((product) => product._id === data._id);

  const handleNameSubmit = async () => {
    if (inputName.trim()) {
      setUser(inputName);

      try {
        const user = await fetch(`http://localhost:3000/api/add-user/${inputName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userJson = await user.json();
        let userCart = [];
        for (const item of userJson.cart) {
          if (!isInCart(item)) {
            userCart.push(item);
          }
        }
        setCart((oldCart) => [...oldCart, ...userCart]);
        setOrders(userJson.orders);
      } catch (error) {
        console.error("Error saving name:", error);
      }

      // try {
      //   const res = await fetch(
      //     `http://localhost:3000/api/get-cart/${inputName}`
      //   );
      //   const cartData = await res.json();
      //   setCart(cartData);
      // } catch (error) {
      //   console.error("Error getting cart:", error);
      // }

      // try {
      //   const res = await fetch(
      //     `http://localhost:3000/api/get-orders/${inputName}`
      //   );
      //   const orderData = await res.json();
      //   setOrders(orderData);
      // } catch (error) {
      //   console.error("Error getting orders:", error);
      // }

      setOpen(false);
    }
  };

  return (
    <div className="dialog">
      <h2>Username</h2>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Username"
      />
      <h2>Password</h2>
      <input
        type="password"
        
        placeholder="Password"
      />
      <button onClick={handleNameSubmit}>Submit</button>
    </div>
  );
};

export default NameDialog;
