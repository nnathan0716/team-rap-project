import React from "react";
import "../css/BillingForm.css";
import { useStoreInfo } from "../hooks/StoreContext";

const BillingForm = ({ savedItems, setDisplayBilling, purchasedItems }) => {
  const { user, orders, setOrders, setCart, total, setTotal } = useStoreInfo();

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    // stop displaying billing form
    setDisplayBilling(false);

    // reset total to saved item prices
    setTotal(savedItems.reduce((acc, item) => acc + Number(item.price), 0));

    // clear cart except for items saved for later
    setCart(savedItems);
    console.log("Total: ", total);
    // save order to database
    const order = {
      date: new Date().toISOString(),
      price: total,
      items: purchasedItems,
    };
    setOrders((oldOrders) => [...oldOrders, order]);
    console.log(purchasedItems);
    try {
      await fetch(`http://localhost:3000/api/add-order/${user}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmitOrder}>
      <div>
        <label>Name on Card:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Credit Card Number:</label>
        <input
          type="text"
          name="creditCardNumber"
          pattern="\d{16}"
          required
          title="Please enter a 16-digit credit card number"
        />
      </div>
      <div>
        <label>Expiration Date:</label>
        <input
          type="text"
          name="expirationDate"
          placeholder="MM/YY"
          pattern="\d{2}/\d{2}"
          required
          title="Please enter a valid expiration date in MM/YY format"
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          pattern="\d{3,4}"
          required
          title="Please enter a 3 or 4-digit CVV"
        />
      </div>
      <div>
        <label>Billing Address:</label>
        <input type="text" name="billingAddress" required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" required />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" required />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          pattern="\d{5}"
          required
          title="Please enter a 5-digit zip code"
        />
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default BillingForm;
