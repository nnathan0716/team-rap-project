import React from "react";
import { Link } from "react-router-dom";
import { getFallbackImage } from "./getFallbackImage";

const CartItem = ({
  item,
  onRemove,
  onSaveForLater,
  onSaveToCart,
  disableButton,
  showSaveForLater,
}) => {

  const handleRemove = () => {
    onRemove(item);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item);
  };

  const handleSaveToCart = () => {
    onSaveToCart(item);
  };

  return (
    <div className="col-12 mb-4">
      <div className="product-card">
        <img
          src={item.image_link}
          className="product-image"
          alt={"Image of " + item.name}
          onError={(ev) => (ev.target.src = getFallbackImage(item.product_type))}
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
            <button
              className="item-button"
              onClick={handleRemove}
              disabled={disableButton}
            >
              Remove
            </button>

            {showSaveForLater ? (
              <button
                className="item-button"
                onClick={handleSaveForLater}
                disabled={disableButton}
              >
                Save for later
              </button>
            ) : (
              <button
                className="item-button"
                onClick={handleSaveToCart}
                disabled={disableButton}
              >
                Buy now
              </button>
            )}
          </div>
        </div>
        <p className="product-price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.price)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
