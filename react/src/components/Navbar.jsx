import { useStoreInfo } from "../hooks/StoreContext";
import { useState } from "react";
import ProductSearch from "./ProductSearch";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import the CSS file

// search, view cart, logout
const Navbar = () => {
  const { user, setUser } = useStoreInfo();

  return (
    <>
      {user && (
        <div className="navbar">
          <div className="navbar-left">
            <ProductSearch />
          </div>
          <div className="navbar-right">
            <Link to="/checkout">View Cart</Link>
            <button onClick={() => setUser(null)}>Sign out</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
