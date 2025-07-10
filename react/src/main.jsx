import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/product/:name" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

