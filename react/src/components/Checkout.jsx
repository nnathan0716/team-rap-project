import { useState, useEffect } from "react";
import { useStoreInfo } from "../hooks/StoreContext";
import CartView from "./CartView";
import Recommended from "./Recommended";
import "../css/Checkout.css";
import BillingForm from "./BillingForm";
import Alert from "./Alert";

const Checkout = () => {
  const { cart, products, total, setTotal } = useStoreInfo();
  const [savedItems, setSavedItems] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [displayRecommended, setDisplayRecommended] = useState(false);
  const [displayBilling, setDisplayBilling] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    // Calculate purchased items whenever cart or savedItems change
    const calculatePurchasedItems = () => {
      const purchased = cart.filter(
        (item) => !savedItems.some((savedItem) => savedItem._id === item._id)
      );
      setPurchasedItems(purchased);
    };

    calculatePurchasedItems();
  }, [cart, savedItems]);

  useEffect(() => {
    const getRecommended = async () => {
      const item = {
        name: purchasedItems[0].name,
        brand: purchasedItems[0].brand,
        price: purchasedItems[0].price,
      };

      const items = cart.map((item) => ({
        name: item.name,
        brand: item.brand,
        price: item.price,
      }));

      try {
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

          if (
            matchedProduct &&
            !cart.find((item) => item._id === matchedProduct._id)
          ) {
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
    console.log("Proceeding to checkout with items:", purchasedItems);
  };

  return (
    <>
    {displayAlert && (
        <Alert
          message={"Order placed successfully!"}
          onClose={() => setDisplayAlert(false)}
          type={"good"}
        />
      )}
      <CartView
        savedItems={savedItems}
        setSavedItems={setSavedItems}
        setDisplayRecommended={setDisplayRecommended}
        displayBilling={displayBilling}
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
      {displayBilling && (
        <BillingForm
          savedItems={savedItems}
          setSavedItems={setSavedItems}
          purchasedItems={purchasedItems}
          setDisplayBilling={setDisplayBilling}
          setDisplayAlert={setDisplayAlert}
        />
      )}
    </>
  );
};

export default Checkout;