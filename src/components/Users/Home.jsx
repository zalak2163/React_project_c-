import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../../components/App.css"; // Import CSS for styling

const Home = () => {
  const [input, setInput] = useState(""); // For the event search input
  const [filteredEvents, setFilteredEvents] = useState([]); // Holds filtered events based on user input
  const [location, setLocation] = useState(""); // For the location filter
  const [date, setDate] = useState(""); // For the date filter
  const [isAdmin, setIsAdmin] = useState(false); // To check if the user is an admin
  const navigate = useNavigate(); // Navigation hook to navigate between pages

  // useEffect to check user role and set admin status based on the JWT token
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
      if (decodedToken.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  // Function to fetch events based on filters (title, location, and date)
  const fetchData = (value, location, date) => {
    fetch("https://localhost:7166/api/Event")
      .then((response) => response.json())
      .then((json) => {
        // Filter events based on user inputs
        const results = json.filter((event) => {
          const matchesTitle = value
            ? event.title?.toLowerCase().includes(value.toLowerCase())
            : true;
          const matchesLocation = location
            ? event.location?.toLowerCase().includes(location.toLowerCase())
            : true;
          const matchesDate = date ? event.date.slice(0, 10) === date : true; // Adjust for date format

          return matchesTitle && matchesLocation && matchesDate;
        });
        setFilteredEvents(results);
      });
  };

  // Update state when user types in the search input
  const handleInputChange = (value) => {
    setInput(value);
  };

  // Update state for location filter
  const handleLocationChange = (value) => {
    setLocation(value);
  };

  // Update state for date filter
  const handleDateChange = (value) => {
    setDate(value);
  };

  // Trigger search when input, location, or date change
  useEffect(() => {
    if (input || location || date) {
      fetchData(input, location, date);
    } else {
      setFilteredEvents([]); // Clear events if no search is active
    }
  }, [input, location, date]);

  return (
    <div className="content">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://images.squarespace-cdn.com/content/v1/64b168715a58c023012b3a74/d2088bb5-d583-4e07-b4c2-55d3d1b680c9/Z+logo+no+background.png?format=1500w"
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
              {isAdmin && (
                <a className="nav-link px-3 py-2 fs-5" href="/eventcration">
                  Event Creation
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(https://t3.ftcdn.net/jpg/09/76/43/34/360_F_976433484_gIYI3duQPBnoOnIp7xPM8zbrDuuBK4Ss.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="text-center">
          <h1
            id="header"
            className="display-2 fw-bold"
            style={{ fontSize: "6rem" }} // Larger font size for the header
          >
            Welcome to Our Event Planning
          </h1>
          <p
            id="paragraph"
            className="lead fw-bold"
            style={{ fontSize: "3rem" }} // Larger font size for the paragraph
          >
            Your perfect event starts here!
          </p>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <input
                  type="text"
                  placeholder="Search for an event..."
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="form-control mb-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Background color for inputs
                    fontSize: "1.2rem", // Larger font size for inputs
                  }}
                />
              </div>
              <div className="col-12 col-md-8 col-lg-6">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="form-control mb-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Background color for inputs
                    fontSize: "1.2rem", // Larger font size for inputs
                  }}
                />
              </div>
              <div className="col-12 col-md-8 col-lg-6">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="form-control mb-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Background color for inputs
                    fontSize: "1.2rem", // Larger font size for inputs
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Filtered Events */}
      {filteredEvents.length > 0 && (
        <div className="container my-5">
          <div className="row">
            {filteredEvents.map((event, index) => (
              <div className="col-md-4 col-sm-6 mb-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-img-top"
                    />
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <a
                      href={`/eventDetails/${event.id}`}
                      className="btn btn-primary"
                    >
                      View Event
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Planning Section */}
      <div className="container1 text-center event-section">
        <h3>EVENT PLANNING & MANAGEMENT</h3>
        <p>
          <em>Bringing your dream event to life!</em>
        </p>
        <p>
          Our team specializes in organizing and managing events of all sizes.
          Whether it’s a wedding, corporate event, or concert, we handle all the
          details.
        </p>
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
    </div>
  );
};

export default Home;
