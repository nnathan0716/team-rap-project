import { useState, useEffect } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import CartView from "./CartView";
import Recommended from "./Recommended";
import "../css/Checkout.css";
import BillingForm from "./BillingForm";

const Checkout = () => {
  const { cart, products } = useStoreInfo();
  const [savedItems, setSavedItems] = useState(cart);
  const [total, setTotal] = useState(0);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [displayRecommended, setDisplayRecommended] = useState(false);
  const [displayBilling, setDisplayBilling] = useState(false);

  useEffect(() => setSavedItems(cart));

  useEffect(() => {
    const getRecommended = async () => {
      const item = {
        name: cart[0].name,
        brand: cart[0].brand,
        price: cart[0].price,
      };
      try {
        // send over just the first item in the cart
        let recs = await fetch("http://localhost:5000/test_recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        recs = await recs.json();

        let recObjects = [];
        for (let item of recs) {
          const matchedProduct = products.find(
            (product) => product.name === item.name
          );
         
          console.log(cart.includes(matchedProduct));
          if (matchedProduct && !cart.find((item) => item._id === matchedProduct._id)) {
            recObjects.push(matchedProduct);
          }
        }

        setRecommendedItems(recObjects);
      } catch (err) {
        console.log(err);
      }
    };

    displayRecommended && getRecommended();
  }, [displayRecommended]);

  const handleProceedToCheckout = () => {
    setDisplayRecommended(false);
    setDisplayBilling(true);
  };

  return (
    <>
      <CartView
        total={total}
        savedItems={savedItems}
        setSavedItems={setSavedItems}
        setTotal={setTotal}
        setDisplayRecommended={setDisplayRecommended}
      />
      {displayRecommended && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Consider adding these items:</h2>
            <button
              className="close-button"
              onClick={() => setDisplayRecommended(false)}
            >
              Close
            </button>
            <Recommended recommendedItems={recommendedItems} />
            <button onClick={handleProceedToCheckout}>
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
      {displayBilling && <BillingForm />}
    </>
  );
};

export default Checkout;
