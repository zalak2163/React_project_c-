import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import eventService from "../../services/eventService";

const Event = () => {
  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fetch all events from the backend
  useEffect(() => {
    eventService
      .getAllEvents()
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <>
      <div className="content">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            {/* Logo is now a clickable link to the homepage */}
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

            {/* Navbar toggler for smaller screens */}
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
                <Link
                  className="nav-link px-3 py-2 fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
                <Link className="nav-link active px-3 py-2 fs-5" to="#">
                  Events
                </Link>

                {/* Show login/signup buttons if not authenticated */}
                {!isAuthenticated ? (
                  <>
                    <Link className="nav-link px-3 py-2 fs-5" to="/login">
                      Login
                    </Link>
                    <Link
                      className="nav-link px-3 py-2 fs-5"
                      to="/registration"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  // Show logout button if authenticated
                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-white"
                  >
                    Logout
                  </button>
                )}

                <Link className="nav-link px-3 py-2 fs-5" to="/cart">
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="py-5">
          <div className="event-page-content">
            <h1 className="mb-4">All Events</h1>
            {loading ? (
              <p>Loading events...</p>
            ) : events.length > 0 ? (
              <div className="row">
                {events.map((event) => (
                  <div key={event.id} className="col-md-4 mb-4">
                    <div className="card event-card">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{event.title}</h5>
                        <p className="card-text">
                          <strong>Location:</strong> {event.location}
                        </p>
                        <p className="card-text">
                          <strong>Date:</strong>{" "}
                          {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                        <Link
                          to={`/eventDetails/${event.id}`}
                          className="btn btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No events found</p>
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
    </>
  );
};

export default Event;
