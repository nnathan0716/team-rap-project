import React from 'react';
import './BillingForm.css';

const BillingForm = () => {
  return (
    <form className="form-container">
      <div>
        <label>Name on Card:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Credit Card Number:</label>
        <input type="text" name="creditCardNumber" required />
      </div>
      <div>
        <label>Expiration Date:</label>
        <input type="text" name="expirationDate" placeholder="MM/YY" required />
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" name="cvv" required />
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
        <input type="text" name="zipCode" required />
      </div>
      <button type="button">Submit Order</button>
    </form>
  );
};

export default BillingForm;
