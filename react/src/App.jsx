import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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
      {products.map((product) => (
        <Link to={`/film/${film.id}`} state={{ info: product }}>
          {film.title}
        </Link>
      ))}
    </>
  );
}

export default App;

// import { useLocation } from "react-router-dom";

// export function Film () {
//     const location = useLocation();
//     const {info} = location.state;