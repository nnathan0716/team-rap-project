import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ data, cart, setCart }) => {
  const isInCart = cart.includes(data._id);

  return (
    <>
      <div className="card">
        <div className="card bg-light">
          <img src={data.image_link} alt={"Image of " + data.name}></img>
          <Link to={`/product/${data.name}`} state={{ info: data }}>
            {data.name}
          </Link>
          <div className="card-text">{data.price}</div>
          {isInCart ? (
            <button
              onClick={() =>
                setCart((oldCart) =>
                  oldCart.filter((productId) => productId !== data._id)
                )
              }
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={() => setCart((oldCart) => [...oldCart, data._id])}
            >
              Add to cart!
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
