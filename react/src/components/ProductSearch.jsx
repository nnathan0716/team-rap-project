import { useState, useEffect } from "react";
import { useStoreInfo } from "../hooks/StoreContext";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, setSearchProducts } = useStoreInfo();

  useEffect(() => {
    const search = async () => {
      if (searchTerm.trim() === "") {
        // Reset to full list if search term is cleared
        setSearchProducts(products);
      } else {
        const response = await fetch(
          `http://localhost:3000/api/by-name/${searchTerm}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const searchResults = await response.json();
        setSearchProducts(searchResults);
      }
    };

    search();
  }, [searchTerm]);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products"
      />
      <button onClick={() => setSearchTerm("")} >Clear</button>
    </div>
  );
};

export default ProductSearch;
