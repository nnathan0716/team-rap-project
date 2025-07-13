import { useLocation } from "react-router-dom";
import "../css/Product.css";
import "../App.css";
import { useStoreInfo } from "../hooks/StoreContext";
import { getFallbackImage } from "./getFallbackImage";

const Product = () => {
  const location = useLocation();
  const productData = location.state?.info;
  const { cart, setCart, setTotal } = useStoreInfo();

  if (!productData) {
    return <div>Loading product data...</div>;
  }

  const isInCart = cart.some((product) => product._id === productData._id);

  const handleRemove = () => {
    setCart((oldCart) => oldCart.filter((product) => product._id !== productData._id));
    setTotal((old) => old - Number(productData.price));
  };

  const handleAdd = () => {
    if (!isInCart) {
      setCart((oldCart) => !isInCart && [...oldCart, productData]);
      setTotal((old) => old + Number(productData.price));
    }
  };

  return (
    <>
      <div className="product-container">
        <div className="product-image">
          <img
            src={productData.image_link}
            alt={`Image of ${productData.name}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getFallbackImage(productData.product_type);
            }}
          />
        </div>
        <div className="product-information">
          <h1>{productData.name}</h1>
          <h2>
            Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(productData.price)}
          </h2>
          <h4>{productData.description}</h4>
          <h4>
            Brand:{" "}
            <a href={productData.product_link} target="_blank">
              {productData.brand}
            </a>
          </h4>
          {isInCart ? (
            <button onClick={handleRemove}>Remove from cart</button>
          ) : (
            <button onClick={handleAdd}>Add to cart!</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
