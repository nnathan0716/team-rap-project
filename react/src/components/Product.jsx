import { useLocation } from "react-router-dom"
import "../css/Product.css"
import "../App.css"
import { useStoreInfo } from "../hooks/StoreContext";

const Product = () => {
    const location = useLocation();
    const productData = location.state?.info;
    const { cart, setCart } = useStoreInfo();
    
    if (!productData) {
        return <div>Loading product data...</div>;
    }
    
    const isInCart = cart.some((product) => product._id === productData._id);
    
    return (
        <>
        <div className="product-container">
            <div className="product-image">
                <img 
                    src={productData.image_link} 
                    alt={`Image of ${productData.name}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.jpg";
                    }}
                />
            </div>
            <div className="product-information">
                <h1>{productData.name}</h1>
                <h2>Price: {productData.price_sign + productData.price}</h2>
                <h4>{productData.description}</h4>
                <h4>Brand: <a href={productData.product_link} target="_blank">{productData.brand}</a></h4>  
                {isInCart ? (
                <button
                onClick={() =>
                    setCart((oldCart) =>
                    oldCart.filter((product) => product._id !== productData._id)
                    )
                }
                >
                Remove from cart
                </button>
            ) : (
                <button
                onClick={() => setCart((oldCart) => [...oldCart, productData])}
                >
                Add to cart!
                </button>
            )}
            </div>
            
        </div>
        </>
    );
}

export default Product
