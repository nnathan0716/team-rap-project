import React, { useState } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import "../css/NameDialog.css"; // Import the CSS file

const NameDialog = () => {
  const [inputName, setInputName] = useState("");
  const { setUser, setCart, setOrders } = useStoreInfo();

  const handleNameSubmit = async () => {
    if (inputName.trim()) {
      setUser(inputName);

      try {
        await fetch(`http://localhost:3000/api/add-user/${inputName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error saving name:", error);
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/get-cart/${inputName}`
        );
        const cartData = await res.json();
        setCart(cartData);
      } catch (error) {
        console.error("Error getting cart:", error);
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/get-orders/${inputName}`
        );
        const orderData = await res.json();
        setOrders(orderData);
      } catch (error) {
        console.error("Error getting orders:", error);
      }
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
