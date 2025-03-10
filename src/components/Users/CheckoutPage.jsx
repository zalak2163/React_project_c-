import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

function CheckoutPage() {
  const location = useLocation();
  const { eventData, ticket } = location.state || {}; // Retrieve eventData and ticket from state
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Update the total price whenever ticketQuantity or eventData changes
  useEffect(() => {
    if (eventData) {
      setTotalPrice(eventData.price * ticketQuantity);
    }
  }, [ticketQuantity, eventData]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmitPurchase = async () => {
    try {
      // Create purchase record
      const purchaseData = {
        userId: 1, // Assume user is logged in
        eventId: eventData.id,
        ticketId: ticket.id,
        quantity: ticketQuantity,
        totalPrice: totalPrice,
        paymentStatus: "Pending", // Or status from payment result
      };

      const purchaseResponse = await axios.post("/api/purchase", purchaseData);
      const purchaseId = purchaseResponse.data.id;

      // Create payment record
      const paymentData = {
        purchaseId: purchaseId,
        paymentMethod: selectedPaymentMethod,
        amount: totalPrice,
        paymentStatus: "Pending",
        transactionId: "12345", // Example transaction ID
      };

      await axios.post("/api/payment", paymentData);
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error processing purchase and payment", error);
      alert("Error processing purchase or payment.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={
                "https://images.squarespace-cdn.com/content/v1/64b168715a58c023012b3a74/d2088bb5-d583-4e07-b4c2-55d3d1b680c9/Z+logo+no+background.png?format=1500w"
              }
              alt="Logo"
              style={{ width: "150px", height: "auto" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto py-3 px-4">
              <a
                className="nav-link px-3 py-2 fs-5"
                aria-current="page"
                href="/"
              >
                Home
              </a>
              <a className="nav-link active px-3 py-2 fs-5" href="#">
                Events
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/login">
                Login
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/registration">
                Sign Up
              </a>
              <button className="btn btn-link text-white">Logout</button>
              <a className="nav-link px-3 py-2 fs-5" href="/cart">
                Cart
              </a>
            </div>
          </div>
        </div>
      </nav>

      <Container className="mt-5">
        {eventData && (
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Checkout</h2>
              <Row className="mb-4">
                <Col md={8}>
                  <div className="ticket-summary">
                    <h5>{eventData.title}</h5>
                    <p>{`Price: $${eventData.price}`}</p>
                    <Form.Group>
                      <Form.Label>Ticket Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        value={ticketQuantity}
                        onChange={(e) =>
                          setTicketQuantity(Number(e.target.value))
                        }
                        min="1"
                      />
                    </Form.Group>
                    <p>{`Total Price: $${totalPrice}`}</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="payment-methods">
                    <h5>Select Payment Method</h5>
                    <Button
                      variant={
                        selectedPaymentMethod === "Credit Card"
                          ? "primary"
                          : "outline-primary"
                      }
                      block
                      onClick={() => handlePaymentMethodChange("Credit Card")}
                    >
                      Credit Card
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "PayPal"
                          ? "primary"
                          : "outline-primary"
                      }
                      block
                      onClick={() => handlePaymentMethodChange("PayPal")}
                    >
                      PayPal
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "Apple Pay"
                          ? "primary"
                          : "outline-primary"
                      }
                      block
                      onClick={() => handlePaymentMethodChange("Apple Pay")}
                    >
                      Apple Pay
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleSubmitPurchase}
                >
                  Complete Purchase
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            {/* Social Media Icons */}
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="https://mail.google.com"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="https://twitter.com"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <section className="mb-4">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Brampton, ON, CA
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i> znpatel2003@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> +1 (204-595-4790)
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2025 Copyright
        </div>
      </footer>
    </>
  );
}

export default CheckoutPage;
