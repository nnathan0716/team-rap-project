import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ data, cart, setCart }) => {
  const isInCart = cart.some((product) => product._id === data._id);

  const addDefaultImg = ev => {
        ev.target.src = "../../public/no-image.jpg"
    }

  return (
    <>
      <div className="card">
          <img className="fallback" src={data.image_link} alt={"Image of " + data.name} onError={addDefaultImg} ></img>
          <Link to={`/product/${data.name}`} state={{ info: data }}>
            {data.name}
          </Link>
          <div className="card-text">{data.price}</div>
          {isInCart ? (
            <button
              onClick={() =>
                setCart((oldCart) =>
                  oldCart.filter((product) => product._id !== data._id)
                )
              }
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={() => setCart((oldCart) => [...oldCart, data])}
            >
              Add to cart!
            </button>
          )}
      </div>
    </>
  );
};

export default ProductCard;
