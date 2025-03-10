import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const EventEdit = () => {
  const [id, setId] = useState("");
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
  // const navigate = useNavigate();

  const handleedit = (id) => {
    handleShow();
    const editurl = `https://localhost:7166/api/Event/${id}`;
    axios
      .get(editurl)
      .then((result) => {
        setId(result.data.id);
        setTitle(result.data.title);
        setDescription(result.data.description);
        setEventDate(result.data.eventDate);
        setLocation(result.data.location);
        setImage(result.data.image);
        setOrganizerName(result.data.organizerName);
        setOrganizerId(result.data.organizerId);
        setTicketType(result.data.ticketType);
        setTicketPrice(result.data.ticketPrice);
        setTicketQuantity(result.data.ticketQuantity);
        setTicketAvailable(result.data.ticketAvailable);
      })
      .catch((error) => {
        console.log(error);
      });

    const handleEditsave = () => {
      const updateurl = `https://localhost:7166/api/Event/${id}`;
      const editsavedata = {
        Title: editedtitle,
        Description: description,
        EventDate: eventDate,
        Location: location,
        Image: image,
        OrganizerName: organizerName,
        OrganizerId: organizerId,
        TicketType: ticketType,
        TicketPrice: ticketPrice,
        TicketQuantity: ticketQuantity,
        TicketAvailable: ticketAvailable,
      };
      axios.put(updateurl, editsavedata).then((result) => {
        getData();
        swal.fire({
          title: "Success",
          text: "Update Successfully",
          Icon: "success",
          confirmButtonText: "OK",
        });
        handleClose();
      });
    };
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
              <a className="nav-link px-3 py-2 fs-5" href="/">
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
                          Edit Event
                        </p>

                        <div className="mx-1 mx-md-4">
                          <form onSubmit={EditEvent}>
                            {/* Input fields */}
                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={id}
                                  onChange={(e) => setId(e.target.value)}
                                  placeholder="Event Id"
                                />
                              </div>
                            </div>

                            {/* Repeat the above structure for other fields */}
                            <div className="d-flex flex-row align-items-center mb-4">
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
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  placeholder="Event description"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={eventDate}
                                  onChange={(e) => setEventDate(e.target.value)}
                                  placeholder="EventDate"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                  placeholder="Location"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={image}
                                  onChange={(e) => setImage(e.target.value)}
                                  placeholder="Image"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={organizerName}
                                  onChange={(e) =>
                                    setOrganizerName(e.target.value)
                                  }
                                  placeholder="OrganizerName"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={organizerId}
                                  onChange={(e) =>
                                    setOrganizerId(e.target.value)
                                  }
                                  placeholder="organizerId"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={ticketType}
                                  onChange={(e) =>
                                    setTicketType(e.target.value)
                                  }
                                  placeholder="TicketType"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={ticketPrice}
                                  onChange={(e) =>
                                    setTicketPrice(e.target.value)
                                  }
                                  placeholder="TicketPrice"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={ticketQuantity}
                                  onChange={(e) =>
                                    setTicketQuantity(e.target.value)
                                  }
                                  placeholder="TicketQuantity"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={ticketAvailable}
                                  onChange={(e) =>
                                    setTicketAvailable(e.target.value)
                                  }
                                  placeholder="TicketAvailable"
                                />
                              </div>
                            </div>

                            {/* Submit button */}
                            <Link
                              to={`/eventDeshboard`}
                              className="btn btn-primary"
                              style={{ marginRight: "20px" }}
                              onclick={handleEditsave}
                            >
                              View Details
                            </Link>
                          </form>
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
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center">
        <div className="container p-4 pb-0">
          <section className="mb-4">{/* Social Links */}</section>
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

export default EventEdit;
