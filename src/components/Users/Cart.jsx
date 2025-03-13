import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cart data from the backend (GET request)
    axios
      .get("https://localhost:7166/api/purchase") // No id here
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load cart.");
        setLoading(false);
      });
  }, []);

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.totalPrice) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return sum + price * quantity;
    }, 0);
    setTotalPrice(total);
  };

  // Handle increasing item quantity
  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCart);

    // Send the updated item to the backend
    const updatedItem = updatedCart.find((item) => item.id === id);
    axios
      .put(`https://localhost:7166/api/purchase/${id}`, updatedItem) // Update the specific item by ID
      .then(() => {
        console.log("Item updated successfully.");
        calculateTotal(updatedCart); // Recalculate total after update
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setError("Failed to update item.");
      });
  };

  // Handle decreasing item quantity
  const handleDecrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedCart);

    // Send the updated item to the backend
    const updatedItem = updatedCart.find((item) => item.id === id);
    axios
      .put(`https://localhost:7166/api/purchase/${id}`, updatedItem) // Update the specific item by ID
      .then(() => {
        console.log("Item updated successfully.");
        calculateTotal(updatedCart); // Recalculate total after update
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setError("Failed to update item.");
      });
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    axios
      .delete(`https://localhost:7166/api/purchase/${id}`) // Delete the specific item by ID
      .then(() => {
        console.log("Item removed successfully.");
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        calculateTotal(updatedCart); // Recalculate total after removal
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        setError("Failed to remove item.");
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Link className="navbar-brand" to="/">
              <img
                src={
                  "https://images.squarespace-cdn.com/content/v1/64b168715a58c023012b3a74/d2088bb5-d583-4e07-b4c2-55d3d1b680c9/Z+logo+no+background.png?format=1500w"
                }
                alt="Logo"
                style={{ width: "150px", height: "auto" }}
                className="img-fluid" // Makes logo responsive
              />
            </Link>
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
              <a className="nav-link active px-3 py-2 fs-5" href="#">
                Home
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/event">
                Events
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/login">
                LogIn
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/registration">
                Sign Up
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/profile">
                Profile
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/checkoutPage">
                CheckoutPage
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-5 flex-grow-1">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4 shadow-lg">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Cart - {cartItems.length} items</h5>
              </div>
              <div className="card-body">
                {/* Loop through each cart item */}
                {cartItems.map((item) => (
                  <div className="row mb-4" key={item.id}>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={item.event?.image}
                          alt={item.event?.title || "Event Image"}
                          className="w-100 rounded"
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{item.event?.title}</strong>
                      </p>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-1 mb-2"
                        title="Remove item"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          className="btn btn-outline-primary px-3 me-2"
                          onClick={() => handleDecrease(item.id)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <div className="form-outline">
                          <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => {
                              const updatedCart = cartItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, quantity: e.target.value }
                                  : i
                              );
                              setCartItems(updatedCart);
                              const updatedItem = updatedCart.find(
                                (i) => i.id === item.id
                              );
                              axios
                                .put(
                                  `https://localhost:7166/api/purchase/${item.id}`,
                                  updatedItem
                                )
                                .then(() => {
                                  console.log("Item updated successfully.");
                                  calculateTotal(updatedCart); // Recalculate total after change
                                })
                                .catch((error) => {
                                  console.error("Error updating item:", error);
                                  setError("Failed to update item.");
                                });
                            }}
                          />
                          <label className="form-label">Quantity</label>
                        </div>

                        <button
                          className="btn btn-outline-primary px-3 ms-2"
                          onClick={() => handleIncrease(item.id)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>Price per ticket: ${item.totalPrice}</strong>
                      </p>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
              </div>
            </div>

            <div className="card mb-4 mb-lg-0 shadow-lg">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                  alt="PayPal acceptance mark"
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-lg">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products <span>${totalPrice.toFixed(2)}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => alert("Redirect to checkout!")} // Placeholder for checkout
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
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
          </section>
        </div>

        <section className="mb-4">
          <div className="container">
            <p>
              <strong>Contact Us:</strong>
              <br />
              Event Planning Co. <br />
              123 Event St, Party City, 00000 <br />
              Phone: (123) 456-7890 <br />
              Email: contact@eventplanningco.com
            </p>
          </div>
        </section>

        <section className="mb-4">
          <div className="container">
            <p>&copy; 2025 Event Planning Co. All rights reserved.</p>
          </div>
        </section>
      </footer>
    </section>
  );
};

export default Cart;
