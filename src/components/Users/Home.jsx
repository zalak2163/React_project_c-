import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/App.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

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

  const fetchData = (value, location, date) => {
    fetch("https://localhost:7166/api/Event")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          const matchesTitle = value
            ? event.title &&
              event.title.toLowerCase().includes(value.toLowerCase())
            : true;
          const matchesLocation = location
            ? event.location &&
              event.location.toLowerCase().includes(location.toLowerCase())
            : true;
          const matchesDate = date
            ? event.date && event.date.slice(0, 10) === date
            : true; // Adjusting for date comparison (assuming date format is 'YYYY-MM-DD')

          return matchesTitle && matchesLocation && matchesDate;
        });
        setFilteredEvents(results);
      });
  };

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  // Use Effect Hook to trigger search after input, location, or date change
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
              {
                <a className="nav-link px-3 py-2 fs-5" href="/eventcration">
                  Event Creation
                </a>
              }
              {/* <a className="nav-link px-3 py-2 fs-5" href="/eventDashboard">
                Event Dashboard
              </a> */}
              {/* <a className="nav-link px-3 py-2 fs-5" href="/eventEdit">
                EventEdit
              </a> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
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
        <div>
          <h1 id="header">Welcome to Our Event Planning</h1>
          <p id="paragraph">Your perfect event starts here!</p>
          <input
            type="text"
            placeholder="Search for an event..."
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="form-control"
            style={{
              width: "700px",
              marginLeft: "300px",
              marginTop: "20px",
              backgroundColor: " rgba(255, 255, 255, 0.7)",
            }}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="form-control"
            style={{
              width: "700px",
              marginLeft: "300px",
              marginTop: "20px",
              backgroundColor: " rgba(255, 255, 255, 0.7)",
            }}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="form-control"
            style={{
              width: "700px",
              marginLeft: "300px",
              marginTop: "20px",
              backgroundColor: " rgba(255, 255, 255, 0.7)",
            }}
          />
        </div>
      </section>

      {/* Display Search Results as Cards */}
      {filteredEvents.length > 0 && (
        <div className="container my-5">
          <div className="row">
            {filteredEvents.map((event, index) => (
              <div className="col-md-4 mb-4" key={index}>
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
      <div className="container1 text-center event-section">
        <h3>EVENT PLANNING & MANAGEMENT</h3>
        <p>
          <em>Bringing your dream event to life!</em>
        </p>
        <p>
          Our team specializes in organizing and managing events of all sizes.
          From intimate gatherings to grand celebrations, we handle every detail
          with care and precision. Whether it’s a corporate event, wedding, or a
          concert, we ensure everything runs smoothly so you can enjoy the
          occasion. Let us help you create unforgettable moments with seamless
          event coordination, creative concepts, and expert execution.
        </p>
      </div>
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
  );
};

export default Home;
