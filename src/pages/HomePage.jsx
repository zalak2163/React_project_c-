import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import eventService from "../services/eventService"; // Service for API calls
import "../styles/HomePage.css";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    date: "",
  });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch all events when the component mounts
  useEffect(() => {
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Filter events based on the search criteria
  useEffect(() => {
    const { location, date } = searchQuery;
    const filtered = events.filter((event) => {
      const matchesLocation = location
        ? event.location.toLowerCase().includes(location.toLowerCase())
        : true;

      // Ensure date comparison works correctly
      const matchesDate = date
        ? new Date(event.eventDate).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
        : true;

      return matchesLocation && matchesDate;
    });
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  // Handle event card click to navigate to the event details page
  const handleEventClick = (id) => {
    navigate(`/event/${id}`); // Navigate to the event detail page using React Router
  };

  // Only show top 3 upcoming events on HomePage
  const upcomingEvents = filteredEvents.slice(0, 3);

  return (
    <div className="home-page">
      {/* Header Section */}
      <header>
        <div className="header-content">
          <div className="logo">
            <h2>EventPlanner</h2>
          </div>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/events">Events</Link> {/* Link to EventsPage */}
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Event Platform</h1>
          <p>Find your next event</p>

          {/* Search Bar for Filtering */}
          <div className="search-bar">
            <input
              type="text"
              name="location"
              value={searchQuery.location}
              onChange={handleSearchChange}
              placeholder="Search by location"
            />
            <input
              type="date"
              name="date"
              value={searchQuery.date}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events">
        {loading ? (
          <p>Loading events...</p>
        ) : upcomingEvents.length > 0 ? (
          <div className="event-list">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="event-card"
                onClick={() => handleEventClick(event.id)} // This triggers navigation
              >
                <img src={event.image} alt={event.title} />
                <h3>{event.title}</h3>
                <p>{event.location}</p>
                <p>{new Date(event.eventDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming events found</p>
        )}
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-links">
          <a href="/about-us">About Us</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
