import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from 'react-router-dom';
import ProductCard from "./components/ProductCard";
import Product from "./components/Product";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const username = "grace";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/all-products");
        const res_json = await res.json();
        setProducts(res_json);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/get-cart/${username}`);
        const cartData = await res.json();
        setCart(cartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    if (username) {
      fetchCart();
    }
  }, [username]);

  return (
    <>
      <h1>Market Masters: Your one stop shop for makeup</h1>
      <div className="product-flex">
        <div className="product-card">
          {products.map((product) => (
            <ProductCard data={product} cart={cart} setCart={setCart} key={product._id}></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

// import { useLocation } from "react-router-dom";

// export function Film () {
//     const location = useLocation();
//     const {info} = location.state;