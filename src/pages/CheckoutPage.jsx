// CheckoutPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { state } = useLocation(); // Retrieve cart data from the previous page
  const cart = state?.cart || [];
  const navigate = useNavigate();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");
  const [creditCardInfo, setCreditCardInfo] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCreditCardChange = (event) => {
    setCreditCardInfo(event.target.value);
  };

  const handleCompletePurchase = () => {
    if (selectedPaymentMethod === "credit-card" && !creditCardInfo) {
      setPaymentStatus("Please enter your credit card details.");
      return;
    }

    // Simulate payment processing (for now, just logging)
    console.log("Payment Successful!");
    setPaymentStatus("Payment Successful!");

    // Optionally, redirect to confirmation or home page after successful payment
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>Event Platform</h1>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/events">Events</a>
        </nav>
      </header>

      {/* Checkout Content */}
      <div className="checkout-content">
        <h2>Ticket Summary</h2>
        {cart.map((item, index) => (
          <div key={index} className="ticket-summary">
            <p>
              {item.title} - {item.ticketType} [Price: ${item.price}]
            </p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}

        <h3>Total Price: ${totalPrice}</h3>

        {/* Payment Methods */}
        <h3>Payment Methods:</h3>
        <div className="payment-methods">
          <button
            onClick={() => handlePaymentMethodSelect("credit-card")}
            className={selectedPaymentMethod === "credit-card" ? "active" : ""}
          >
            Credit Card
          </button>
          <button
            onClick={() => handlePaymentMethodSelect("paypal")}
            className={selectedPaymentMethod === "paypal" ? "active" : ""}
          >
            PayPal
          </button>
          <button
            onClick={() => handlePaymentMethodSelect("apple-pay")}
            className={selectedPaymentMethod === "apple-pay" ? "active" : ""}
          >
            Apple Pay
          </button>
        </div>

        {/* Credit Card Info */}
        {selectedPaymentMethod === "credit-card" && (
          <div className="credit-card-info">
            <label htmlFor="credit-card">Enter Credit Card Info:</label>
            <input
              type="text"
              id="credit-card"
              value={creditCardInfo}
              onChange={handleCreditCardChange}
              placeholder="1234 5678 9101 1121"
            />
          </div>
        )}

        {/* Complete Purchase Button */}
        <div className="complete-purchase">
          <button onClick={handleCompletePurchase}>Complete Purchase</button>
        </div>

        {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Event Platform</p>
        <p>
          <a href="/about">About Us</a> | <a href="/terms">Terms of Service</a>{" "}
          | <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
