import { useStoreInfo } from "../hooks/StoreContext";
import React, { useState, useEffect } from "react";
import "../css/Orders.css"
import { Link } from "react-router-dom";

const Orders = () => {
  const { cart, user, orders, setOrders } = useStoreInfo();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/get-orders/${user}`);
        const res = await response.json();
        setOrders(res);
        console.log(orders)
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };
    getOrders();
  }, []);
  console.log(cart)

  return (
    <div className="orders-container">
    <h1>Orders</h1>
    <div className="order-list">
      {cart.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-image-container">
            <img 
              className="order-image"
              src={order.image_link} 
              alt={`Image of ${order.name}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/no-image.jpg";
              }}
            />
          </div>
          <div className="order-details">
            <Link to={`/product/${order.name}`} state={{ info: order }}>
              {order.name}
            </Link>
            {/* <h3 className="product-name"><a>{order.name}</a></h3> */}
            <p className="product-price">{new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(order.price)}</p>
          <p>{new Date(order.created_at).toDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Orders;
