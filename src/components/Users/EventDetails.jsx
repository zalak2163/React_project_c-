import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/eventService";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams(); // Extract id from URL
  const [eventbyid, setEventById] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch event by ID
      eventService
        .getEventById(id)
        .then((response) => {
          setEventById(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
          setLoading(false);
        });
    }
  }, [id]);
  const [userId, setUserId] = useState(5); // Mock the userId (replace this later with actual user authentication)

  const handleAddticket = (ticketId) => {
    if (!userId) {
      console.error("User ID is missing! Please log in.");
      return;
    }

    const eventId = eventbyid.id;
    const quantity = 1; // Example: set the quantity to 1
    const totalPrice = eventbyid.tickets.find(
      (ticket) => ticket.id === ticketId
    )?.price;

    const data = {
      UserId: userId, // Use the mocked userId
      EventId: eventId,
      TicketId: ticketId,
      Quantity: quantity,
      TotalPrice: totalPrice,
      PaymentStatus: "Pending", // Adjust if needed
    };

    axios
      .post("https://localhost:7166/api/Purchase", data)
      .then((result) => {
        if (result.status === 201) {
          alert("Data added successfully!");
        } else {
          alert("Data not added!");
        }
      })
      .catch((error) => {
        console.error("Error adding ticket:", error.response?.data || error);
      });
  };

  return (
    <div className="content d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
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
              <a className="nav-link px-3 py-2 fs-5 active" href="#">
                EventDetails
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/event">
                Event
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/login">
                Login
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/registration">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-5 flex-grow-1">
        <div className="event-page-content text-center">
          <h1 className="mb-4">Event Details</h1>
          {loading ? (
            <p>Loading event...</p>
          ) : eventbyid ? (
            <div className="row justify-content-center">
              <div className="col-md-6 mb-4">
                <div
                  className="card shadow-lg rounded-3"
                  style={{
                    border: "none",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <img
                    src={eventbyid.image}
                    alt={eventbyid.title}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.375rem",
                      borderTopRightRadius: "0.375rem",
                    }}
                  />
                  <div className="card-body bg-light">
                    <h5 className="card-title">{eventbyid.title}</h5>
                    <p className="card-text">
                      <strong>Location:</strong> {eventbyid.location}
                    </p>
                    <p className="card-text">
                      <strong>Date:</strong>{" "}
                      {new Date(eventbyid.eventDate).toLocaleDateString()}
                    </p>
                    <h4>
                      <strong>Description:</strong> {eventbyid.description}
                    </h4>

                    {/* Displaying ticket details */}
                    {eventbyid.tickets && eventbyid.tickets.length > 0 ? (
                      eventbyid.tickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="ticket-info mb-3 p-3 border rounded-3 shadow-sm"
                        >
                          <p>
                            <strong>Ticket Type:</strong> {ticket.ticketType}
                          </p>
                          <p>
                            <strong>Price:</strong> ${ticket.price}
                          </p>
                          <p>
                            <strong>Available:</strong> {ticket.available}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {ticket.quantity}
                          </p>
                          <button
                            className="btn btn-primary"
                            style={{ marginRight: "20px" }}
                            onClick={() => handleAddticket(ticket.id)} // Now `ticket` is in scope here
                          >
                            <i
                              className="fas fa-shopping-cart"
                              style={{ marginRight: "8px" }}
                            ></i>
                            Add to cart
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No ticket details available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No event found</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
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
          <div className="container">
            <p>
              <strong>Contact Us:</strong>
              <br />
              Event Planning Co.
              <br />
              123 Event St, Party City, 00000
              <br />
              Phone: (123) 456-7890
              <br />
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
    </div>
  );
};

export default EventDetails;
