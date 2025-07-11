import React from 'react';
import '../css/BillingForm.css';
import { useStoreInfo } from '../hooks/StoreContext';

const BillingForm = () => {
  const { orders, setOrders } = useStoreInfo();

  return (
    <form className="form-container">
      <div>
        <label>Name on Card:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Credit Card Number:</label>
        <input type="text" name="creditCardNumber" pattern="\d{16}" required title="Please enter a 16-digit credit card number" />
      </div>
      <div>
        <label>Expiration Date:</label>
        <input type="text" name="expirationDate" placeholder="MM/YY" pattern="\d{2}/\d{2}" required title="Please enter a valid expiration date in MM/YY format" />
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" name="cvv" pattern="\d{3,4}" required title="Please enter a 3 or 4-digit CVV" />
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
        <input type="text" name="zipCode" pattern="\d{5}" required title="Please enter a 5-digit zip code" />
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default BillingForm;
