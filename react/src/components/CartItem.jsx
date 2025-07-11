import React, { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onRemove, onSaveForLater, onSaveToCart, isInCart }) => {
  const [showSaveForLater, setShowSaveForLater] = useState(true);

  const handleRemove = () => {
    onRemove(item._id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item._id);
    setShowSaveForLater(false);
  };

  const handleSaveToCart = () => {
    onSaveToCart(item);
    setShowSaveForLater(true);
  };

  return (
    <div className="col-12 mb-4">
      <div className="product-card">
        <img
          src={item.image_link}
          className="product-image"
          alt={"Image of " + item.name}
          onError={(ev) => (ev.target.src = "../../public/no-image.jpg")}
        />
        <div className="product-info">
          <Link
            to={`/product/${item.name}`}
            state={{ info: item }}
            className="product-name"
          >
            {item.name}
          </Link>
          <div className="button-group">
            <button className="btn btn-danger" onClick={handleRemove}>
              Remove
            </button>

            {showSaveForLater ? (
              <button className="btn btn-secondary" onClick={handleSaveForLater}>
                Save for later
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleSaveToCart}>
                Buy now
              </button>
            )}
          </div>
        </div>
        <p className="product-price">{new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.price)}</p>
      </div>
    </div>
  );
};

export default CartItem;
