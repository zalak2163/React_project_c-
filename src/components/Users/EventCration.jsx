import React, { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { Link } from "react-router-dom";
import axios from "axios";

const EventCreation = () => {
  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketAvailable, setTicketAvailable] = useState(0);
  const [getallevent, setGetAllEvent] = useState([]);
  const [eventId, setEventId] = useState("");
  const url = "https://localhost:7166/api/Event";

  const handlesubmit = (e) => {
    e.preventDefault();

    const ticket = {
      ticketType,
      price: ticketPrice,
      quantity: ticketQuantity,
      available: ticketAvailable,
    };

    const data = {
      title,
      description,
      eventDate,
      location,
      image,
      organizerName,
      organizerId,
      tickets: [ticket],
    };

    axios
      .post(`${url}`, data)
      .then((json) => {
        setEvent([...events, json.data]);
        clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const ticket = {
      ticketType,
      price: ticketPrice,
      quantity: ticketQuantity,
      available: ticketAvailable,
    };

    const data = {
      title,
      description,
      eventDate,
      location,
      image,
      organizerName,
      organizerId,
      tickets: [ticket],
    };

    axios
      .put(`${url}/${eventId}`, data)
      .then((response) => {
        setEvent((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? response.data : event
          )
        );
        clear();
      })
      .catch((error) => {
        console.log("Error updating event:", error);
      });
  };

  const handleEdit = (id) => {
    if (id > 0) {
      setEventId(id);
      axios
        .get(`https://localhost:7166/api/Event/${id}`)
        .then((json) => {
          if (json.data) {
            setTitle(json.data.title);
            setDescription(json.data.description);
            const formattedDate = new Date(json.data.eventDate)
              .toISOString()
              .split("T")[0];
            setEventDate(formattedDate);
            setLocation(json.data.location);
            setImage(json.data.image);
            setOrganizerName(json.data.organizerName);
            setOrganizerId(json.data.organizerId);

            if (json.data.tickets && json.data.tickets.length > 0) {
              const ticket = json.data.tickets[0];
              setTicketType(ticket.ticketType || "");
              setTicketPrice(ticket.price || 0);
              setTicketQuantity(ticket.quantity || 0);
              setTicketAvailable(ticket.available || 0);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          getallevent();
          clear();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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

  const clear = () => {
    setTitle("");
    setDescription("");
    setEventDate("");
    setLocation("");
    setImage("");
    setOrganizerName("");
    setOrganizerId("");
    setTicketType("");
    setTicketPrice("");
    setTicketQuantity("");
    setTicketAvailable("");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://images.squarespace-cdn.com/content/v1/64b168715a58c023012b3a74/d2088bb5-d583-4e07-b4c2-55d3d1b680c9/Z+logo+no+background.png?format=1500w"
              alt="Logo"
              style={{ width: "150px", height: "auto" }}
              className="img-fluid"
            />
          </Link>

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
              <Link className="nav-link px-3 py-2 fs-5" to="/cart">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-5">
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-10">
                <div
                  className="card text-black"
                  style={{
                    borderRadius: "25px",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      {/* Form column */}
                      <div className="col-md-10 col-lg-6 col-xl-5">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Event Creation
                        </p>
                        <div className="mx-1 mx-md-4">
                          <div className="d-flex flex-column align-items-center mb-4">
                            <input
                              type="text"
                              className="form-control mb-2"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Event Title"
                            />
                            <input
                              type="text"
                              className="form-control mb-2"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Event Description"
                            />
                            <input
                              type="date"
                              className="form-control mb-2"
                              value={eventDate}
                              onChange={(e) => setEventDate(e.target.value)}
                              placeholder="Event Date"
                            />
                            <input
                              type="text"
                              className="form-control mb-2"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="Event Location"
                            />
                            <input
                              type="url"
                              className="form-control mb-2"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}
                              placeholder="Event Image URL"
                            />
                            <input
                              type="text"
                              className="form-control mb-2"
                              value={organizerName}
                              onChange={(e) => setOrganizerName(e.target.value)}
                              placeholder="Organizer Name"
                            />
                            <input
                              type="text"
                              className="form-control mb-2"
                              value={organizerId}
                              onChange={(e) => setOrganizerId(e.target.value)}
                              placeholder="Organizer ID"
                            />
                            <input
                              type="text"
                              className="form-control mb-2"
                              value={ticketType}
                              onChange={(e) => setTicketType(e.target.value)}
                              placeholder="Ticket Type"
                            />
                            <input
                              type="number"
                              className="form-control mb-2"
                              value={ticketPrice}
                              onChange={(e) => setTicketPrice(e.target.value)}
                              placeholder="Ticket Price"
                            />
                            <input
                              type="number"
                              className="form-control mb-2"
                              value={ticketQuantity}
                              onChange={(e) =>
                                setTicketQuantity(e.target.value)
                              }
                              placeholder="Ticket Quantity"
                            />
                            <input
                              type="number"
                              className="form-control mb-2"
                              value={ticketAvailable}
                              onChange={(e) =>
                                setTicketAvailable(e.target.value)
                              }
                              placeholder="Tickets Available"
                            />
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-primary btn-lg w-100 mb-2"
                                onClick={(e) => handlesubmit(e)}
                              >
                                Create Event
                              </button>
                              {eventId && (
                                <button
                                  type="button"
                                  className="btn btn-warning btn-lg w-100 mb-2"
                                  onClick={(e) => handleUpdate(e)}
                                >
                                  Update Event
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Image column */}
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex justify-content-center">
                        <img
                          src="https://st4.depositphotos.com/2894069/23242/v/450/depositphotos_232426726-stock-illustration-card-winter-holidays-corporate-party.jpg"
                          className="img-fluid rounded"
                          alt="Event"
                          style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h1 className="mb-4 text-center">All Events</h1>
            {loading ? (
              <p>Loading events...</p>
            ) : events.length > 0 ? (
              <div className="row">
                {events.map((event) => (
                  <div
                    key={event.id || `${event.title}-${event.location}`}
                    className="col-md-4 mb-4"
                  >
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
                          style={{ marginRight: "10px" }}
                        >
                          View Details
                        </Link>
                        <Link
                          className="btn btn-warning"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEdit(event.id)}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn btn-danger"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
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
        </section>
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
  );
};

export default EventCreation;
