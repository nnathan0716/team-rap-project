import { useStoreInfo } from "../hooks/StoreContext";
import { useState } from "react";
import ProductSearch from "./ProductSearch";
import NameDialog from "./NameDialog";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

// search, view cart, logout
const Navbar = () => {
  const { user, setUser, cart, setCart } = useStoreInfo();
  const navigate = useNavigate();
  const [displaySignin, setDisplaySignin] = useState(false);

  const handleSignout = async () => {
    setUser(null);
    setTotal(0);
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

    // clear cart
    setCart([]);
    
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
          <ProductSearch />
        </div>
        <div className="navbar-right">
          <Link to="/orders">Orders</Link>
          <Link to="/checkout">View Cart</Link>
          {user ? (
            <button onClick={handleSignout}>
              {user}
              <br />
              Sign out
            </button>
          ) : (
            <button onClick={() => setDisplaySignin(true)}>Sign in</button>
          )}
        </div>
      </div>
      {displaySignin && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Sign In</h2>
            <button
              className="close-button"
              onClick={() => setDisplaySignin(false)}
            >
              Close
            </button>
            <NameDialog setOpen={setDisplaySignin} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
