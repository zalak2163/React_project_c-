import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import eventService from "../services/eventService"; // Import event service
import "../styles/EventPage.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data); // Store events data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="event-page">
      {/* Header Section */}
      <header className="event-page-header">
        <div className="logo">EventApp</div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="event-page-content">
        <h1>All Events</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          <div className="event-list">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.title} />
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-location">{event.location}</p>
                  <p className="event-date">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                  {/* Link to event details */}
                  <Link to={`/event/${event.id}`} className="event-detail-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No events found</p>
        )}
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 EventApp. All Rights Reserved.</p>
        <p>
          <a href="/terms">Terms of Service</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default EventPage;
