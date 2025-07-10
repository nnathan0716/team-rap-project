import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating an authentication context
const StoreContext = createContext(null);

// Auth provider component that wraps your app components
export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await fetch("http://localhost:3000/api/all-products");
            const res_json = await res.json();
            setProducts(res_json);
            setSearchProducts(res_json);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchProducts();
        
      }, []);


    return (
        <StoreContext.Provider value={{ user, setUser, products, searchProducts, setSearchProducts, cart, setCart }}>
            {children}
        </StoreContext.Provider>
    );
};


export const useStoreInfo = () => useContext(StoreContext);