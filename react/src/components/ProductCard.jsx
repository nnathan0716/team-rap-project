import { Link } from "react-router-dom";
import { useState } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import { getFallbackImage } from "./getFallbackImage";

const ProductCard = ({ data }) => {
  const { cart, setCart, total, setTotal } = useStoreInfo();
  const isInCart = cart.some((product) => product._id === data._id);

  const addDefaultImg = (ev) => {
    ev.target.src = getFallbackImage(data.product_type);
  };

  const handleRemove = () => {
    setCart((oldCart) => oldCart.filter((product) => product._id !== data._id));
    setTotal((old) => old - Number(data.price));
  };

  const handleAdd = () => {
    if (!isInCart) {
      setCart((oldCart) => !isInCart && [...oldCart, data]);
      setTotal((old) => old + Number(data.price));
    }
  }

  return (
    <>
      <div className="card">
        <img
          className="fallback"
          src={data.image_link}
          alt={"Image of " + data.name}
          onError={addDefaultImg}
        ></img>
        <Link to={`/product/${data.name}`} state={{ info: data }}>
          {data.name}
        </Link>
        <div className="card-text">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(data.price)}
        </div>
        {isInCart ? (
          <button onClick={handleRemove}>Remove from cart</button>
        ) : (
          <button onClick={handleAdd}>
            Add to cart!
          </button>
        )}
      </div>
    </>
  );
};

export default ProductCard;
