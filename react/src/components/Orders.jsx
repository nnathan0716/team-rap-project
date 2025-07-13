import { useStoreInfo } from "../hooks/StoreContext";
import React, { useState } from "react";
import "../css/Orders.css";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const Orders = () => {
  const { cart, user, orders, setOrders } = useStoreInfo();
  const [displayAlert, setDisplayAlert] = useState(!user);
  const [expandedOrders, setExpandedOrders] = useState({});
  
  const toggleOrderItems = (orderIndex) => {
    // toggling each dropdown
    setExpandedOrders(prev => ({
      ...prev,
      [orderIndex]: !prev[orderIndex]
    }));
  };

  const orders_reversed = [...orders].reverse() // lazy solution lol

  return (
    <div className="orders-container">
      {displayAlert && (
        <Alert
          message={"Please sign in to view your orders"}
          onClose={() => setDisplayAlert(false)}
          type={"bad"}
        />
      )}
      <h1>Orders</h1>
      <div className="order-list">
        {orders_reversed.map((order, index) => ( // change this to orders so it shows up chronologially
          <div className="order-card" key={index}>
            <div className="order-summary" onClick={() => toggleOrderItems(index)}>
              <div className="order-header">
                  <p className="order-date">{new Date(order.date).toDateString()}</p>
                  <p className="product-price">
                    Total: {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(order.price)}
                  </p>
                
                <div className="dropdown-indicator">
                  {expandedOrders[index] ? '▲' : '▼'}
                </div>
              </div>
            </div>

            {expandedOrders[index] && (
              <div className="order-items-dropdown">
                <h4>Order Items</h4>
                {order.items && order.items.length > 0 ? (
                  <div className="items-list">
                    {order.items.map((item, itemIndex) => (
                      <div className="order-item" key={itemIndex}>
                        {item.image_link && (
                          <div className="item-image-container">
                            <img
                              className="item-image"
                              src={item.image_link}
                              alt={`Image of ${item.name}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/no-image.jpg";
                              }}
                            />
                          </div>
                        )}
                        <div className="item-details">
                          <p className="item-name">
                            <Link 
                              to={`/product/${item.name}`} 
                              state={{ info: item }}
                            >
                              {item.name || 'N/A'}
                            </Link>
                          </p>
                          {item.price && (
                            <p className="item-price">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(item.price)}
                            </p>
                          )}
                          {item.quantity && (
                            <p className="item-quantity">Quantity: {item.quantity}</p>
                          )}
                          {item.description && (
                            <p className="item-description">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No detailed information available for this order.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
