import { useStoreInfo } from "../hooks/StoreContext";
import { useState } from "react";
import ProductSearch from "./ProductSearch";
import { Link, useNavigate } from "react-router-dom"; 
import "../css/Navbar.css"; 

// search, view cart, logout
const Navbar = () => {
  const { user, setUser, cart } = useStoreInfo();
  const navigate = useNavigate(); 

  const handleClick = async () => {
    // Save user's cart to database
    try {
      console.log(cart);
      const cartJson = { cart };
      await fetch(`http://localhost:3000/api/update-cart/${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartJson),
      });
    } catch (err) {
      console.error(err);
    }
    setUser(null); 
    navigate("/"); 
  };

  return (
    <>
      {user && (
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/">Home</Link>
            <ProductSearch />
          </div>
          <div className="navbar-right">
            <Link to="/orders">Orders</Link>
            <Link to="/checkout">View Cart</Link>
            <button onClick={handleClick}>
              {user}
              <br />
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
