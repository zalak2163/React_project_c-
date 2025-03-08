import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/eventService";

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

  return (
    <div className="content">
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
      <main className="py-5">
        <div className="event-page-content text-center">
          <h1 className="mb-4">Event Details</h1>
          {loading ? (
            <p>Loading event...</p>
          ) : eventbyid ? (
            <div className="row justify-content-center">
              <div className="col-md-6 mb-4">
                <div
                  className="card shadow-lg rounded-3"
                  style={{ border: "none" }}
                >
                  <img
                    src={eventbyid.image}
                    alt={eventbyid.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
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
                    <div className="ticket-details">
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
                          </div>
                        ))
                      ) : (
                        <p>No ticket details available.</p>
                      )}
                    </div>
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
    </div>
  );
};

export default EventDetails;
