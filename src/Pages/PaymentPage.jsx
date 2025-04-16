import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount } = location.state || { totalAmount: 0 };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <div className="total-amount">
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="card-name">Cardholder Name</label>
          <input type="text" id="card-name" placeholder='John Doe' required />
        </div>
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" placeholder='1234 5678 9012 3456' required />
        </div>
        <div className="form-group">
          <label htmlFor="expiry-date">Expiry Date</label>
          <input type="text" id="expiry-date"  placeholder='MM / YY' required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder='XXX' required />
        </div>
        <button type="submit">Pay ₹{totalAmount.toFixed(2)}</button>
      </form>
    </div>
  );
};

export default PaymentPage;