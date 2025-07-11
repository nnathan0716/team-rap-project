import { useLocation } from "react-router-dom"
import "../css/Product.css"
import "../App.css"

const Product = (props) => {
    const location = useLocation();
    const productData = location.state?.info;
    if (!productData) {
        return <div>Loading product data...</div>;
    }
    
    return (
        <>
        <div className="product-container">
            <h1>{productData.name}</h1>
                <p>Price: {productData.price}</p>
                <img 
                    src={productData.image_link} 
                    alt={`Image of ${productData.name}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.jpg";
                    }}
                />
        </div>
            
        </>
    );
}

export default Product