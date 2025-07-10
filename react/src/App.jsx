import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from 'react-router-dom';
import ProductCard from "./components/ProductCard";
import Product from "./components/Product";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const displayProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/all-products");
        const res_json = await res.json();
        setProducts(res_json);
      } catch (err) {
        console.error(err);
      }
    };
    displayProducts();
  });

  return (
    <>
      <h1>Market Masters: Your one stop shop for makeup</h1>
      <div className="product-flex">
        <div className="product-card">
          {products.map((product) => (
            <ProductCard data={product}></ProductCard>
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