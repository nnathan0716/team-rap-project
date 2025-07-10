import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import NameDialog from "./components/NameDialog";
import { useStoreInfo } from "./hooks/StoreContext";

function App() {
  const { user, products, cart, setCart } = useStoreInfo();
  const [hasSignedIn, setHasSignedIn] = useState(false);

  return (
    <>
      {user && <h3>{user}</h3>}

      <h1>Market Masters: Your one stop shop for makeup</h1>
      {hasSignedIn ? (
        <div className="product-cards">
            {products.map((product) => (
              <ProductCard
                data={product}
                cart={cart}
                setCart={setCart}
                key={product._id}
              ></ProductCard>
            ))}
        </div>
      ) : (
        <NameDialog setHasSignedIn={setHasSignedIn} />
      )}
    </>
  );
}

export default App;

// import { useLocation } from "react-router-dom";

// export function Film () {
//     const location = useLocation();
//     const {info} = location.state;
