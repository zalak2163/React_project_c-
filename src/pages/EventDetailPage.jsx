import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventService from "../services/eventService";
import "../styles/EventDetailPage.css";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Track added tickets
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch event details on component mount
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Get cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    eventService
      .getEventById(id)
      .then((response) => {
        if (response.data) {
          setEvent(response.data);
        } else {
          setError("Event not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching event details.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (ticket, quantity) => {
    if (ticket.available >= quantity && quantity > 0) {
      // Create a new cart item or update if it already exists
      const updatedCart = [...cart];
      const existingTicketIndex = updatedCart.findIndex(
        (item) => item.id === ticket.id
      );

      if (existingTicketIndex >= 0) {
        // Update quantity if ticket already exists in the cart
        updatedCart[existingTicketIndex].quantity += quantity;
      } else {
        // Add new ticket to the cart
        updatedCart.push({ ...ticket, quantity });
      }

      // Update the state and persist to localStorage
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Decrement ticket availability (in a real-world app, this should be done via backend API)
      ticket.available -= quantity;
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout", { state: { cart } });
    } else {
      setError("No items in cart to checkout");
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="event-detail-page">
      <header className="header">
        <div className="logo">
          <h1>Event Platform</h1>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <div className="event-details">
        {/* Event Image */}
        <img
          src={event?.image || "default-image-url.jpg"}
          alt={event?.title}
          className="event-image"
        />

        {/* Event Details */}
        <div className="event-description">
          <h2>{event?.title || "Event Title"}</h2>
          <p>{event?.description || "Event description not available."}</p>
          <p>
            <strong>Location:</strong>{" "}
            {event?.location || "Location not specified"}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {new Date(event?.eventDate).toLocaleString() ||
              "Date not available"}
          </p>

          <div className="ticket-types">
            <h3>Ticket Types</h3>
            {event?.tickets && event.tickets.length > 0 ? (
              event.tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-option">
                  <h4>{ticket.ticketType}</h4>
                  <p>Price: ${ticket.price}</p>
                  <p>Available: {ticket.available} tickets left</p>

                  {/* Quantity Input */}
                  <div className="quantity-selector">
                    <input
                      type="number"
                      min="1"
                      max={ticket.available}
                      defaultValue="1"
                      id={`quantity-${ticket.id}`}
                    />
                  </div>

                  {/* Add to Cart Button */}
                  {ticket.available > 0 ? (
                    <button
                      onClick={() => {
                        const quantity = parseInt(
                          document.getElementById(`quantity-${ticket.id}`).value
                        );
                        handleAddToCart(ticket, quantity);
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="sold-out">Sold Out</span>
                  )}
                </div>
              ))
            ) : (
              <p>No tickets available for this event.</p>
            )}
          </div>

          {/* Checkout Button */}
          <div className="checkout-container">
            <button
              onClick={handleProceedToCheckout}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Event Platform</p>
      </footer>
    </div>
  );
};

export default EventDetailPage;
