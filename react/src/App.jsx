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
      {user ? (
        <div className="product-flex">
          <div className="product-card">
            {searchProducts.map((product) => (
              <ProductCard
                data={product}
                cart={cart}
                setCart={setCart}
                key={product._id}
              ></ProductCard>
            ))}
        </div>
      ) : (
        <NameDialog />
      )}
    </>
  );
}

export default App;

// import { useLocation } from "react-router-dom";

// export function Film () {
//     const location = useLocation();
//     const {info} = location.state;
