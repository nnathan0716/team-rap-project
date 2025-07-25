import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import NameDialog from "./components/NameDialog";
import { useStoreInfo } from "./hooks/StoreContext";

function App() {
  const { user, searchProducts, cart, setCart } = useStoreInfo();

  return (
    <>
      <h1>Makeup Masters: Your one stop shop for makeup</h1>
      <div className="product-flex">
        <div className="product-cards">
          {searchProducts.map((product) => (
            <ProductCard
              data={product}
              cart={cart}
              setCart={setCart}
              key={product._id}
            ></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
