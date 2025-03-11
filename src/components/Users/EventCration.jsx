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

    // Create the ticket object
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
      tickets: [ticket], // Wrap the ticket object in an array
    };

    // Debugging step to verify ticket data
    console.log(data);

    // Send data to backend
    axios
      .post(`${url}`, data)
      .then((json) => {
        setEvent([...events, json.data]);
        clear(); // Clear the form after successful submit
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
      tickets: [ticket], // Wrap the ticket object in an array
    };

    // Log data to ensure it's structured correctly
    console.log("Updating event with data:", data);

    axios
      .put(`${url}/${eventId}`, data)
      .then((response) => {
        console.log("Updated event data:", response.data); // Log response to ensure updated event is received
        setEvent((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? response.data : event
          )
        );
        clear(); // Clear form after update
        console.log("Event updated successfully:", response.data);
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

            // Format eventDate to 'yyyy-MM-dd' format
            const formattedDate = new Date(json.data.eventDate)
              .toISOString()
              .split("T")[0];
            setEventDate(formattedDate); // Set the formatted date

            setLocation(json.data.location);
            setImage(json.data.image);
            setOrganizerName(json.data.organizerName);
            setOrganizerId(json.data.organizerId);

            // Handle ticket data if available
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
        .delete(`${url}/${id}`) // Use DELETE method for deleting the event
        .then((json) => {
          getallevent();
          clear();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const getEvents = () => {
  //   axios
  //     .get(`${url}`)
  //     .then((json) => {
  //       setGetAllEvent(json.data.events);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getEvents();
  // }, []);
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
              <a
                className="nav-link px-3 py-2 fs-5"
                aria-current="page"
                href="/"
              >
                Home
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/event">
                Events
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/login">
                Login
              </a>
              <a className="nav-link active px-3 py-2 fs-5" href="#">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      {/* Form column now on the right */}
                      <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Event Creation
                        </p>

                        <div className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Event Title"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Event Description"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="date"
                                className="form-control"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                placeholder="Event Date"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-location-pin fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Event Location"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-image fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="url"
                                className="form-control"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Event Image URL"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user-circle fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={organizerName}
                                onChange={(e) =>
                                  setOrganizerName(e.target.value)
                                }
                                placeholder="Organizer Name"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-id-card fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={organizerId}
                                onChange={(e) => setOrganizerId(e.target.value)}
                                placeholder="Organizer ID"
                              />
                            </div>
                          </div>

                          {/* Ticket Information */}
                          {/* Ticket Information */}
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-ticket-alt fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={ticketType}
                                onChange={(e) => setTicketType(e.target.value)} // Capture ticket type input
                                placeholder="Ticket Type"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-dollar-sign fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="number"
                                className="form-control"
                                value={ticketPrice}
                                onChange={(e) => setTicketPrice(e.target.value)} // Capture ticket price input
                                placeholder="Ticket Price"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-box fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="number"
                                className="form-control"
                                value={ticketQuantity}
                                onChange={(e) =>
                                  setTicketQuantity(e.target.value)
                                } // Capture ticket quantity input
                                placeholder="Ticket Quantity"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-check-circle fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="number"
                                className="form-control"
                                value={ticketAvailable}
                                onChange={(e) =>
                                  setTicketAvailable(e.target.value)
                                } // Capture ticket availability input
                                placeholder="Tickets Available"
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={(e) => handlesubmit(e)}
                            >
                              Create Event
                            </button>
                            {eventId && (
                              <button
                                type="button"
                                className="btn btn-warning btn-lg"
                                onClick={(e) => handleUpdate(e)}
                              >
                                Update Event
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Image column */}
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-2 order-lg-1">
                        <img
                          src="https://st4.depositphotos.com/2894069/23242/v/450/depositphotos_232426726-stock-illustration-card-winter-holidays-corporate-party.jpg"
                          className="img-fluid"
                          alt="Event"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <main className="py-5">
          <div className="event-page-content">
            <h1 className="mb-4">All Events</h1>
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
                          className="btn btn-primary"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEdit(event.id)}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn btn-primary"
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
        </main>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            {/* Other footer icons */}
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

export default EventCreation;
