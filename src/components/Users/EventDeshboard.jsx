import axios from "axios";
import React, { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { Link } from "react-router-dom";

const EventDeshboard = () => {
  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    if (id > 0) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this event?"
      );

      if (confirmDelete) {
        axios
          .delete(`https://localhost:7166/api/Event/${id}`)
          .then(() => {
            getAllEvents(); // Reload events after successful deletion
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      }
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
  return (
    <>
      <div className="content">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src={
                  "https://images.squarespace-cdn.com/content/v1/64b168715a58c023012b3a74/d2088bb5-d583-4e07-b4c2-55d3d1b680c9/Z+logo+no+background.png?format=1500w"
                } // Replace with the correct path to your logo
                alt="Logo"
                style={{ width: "150px", height: "auto" }} // Adjust logo size as needed
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
                {" "}
                {/* ms-auto moves it to the right */}
                <a
                  className="nav-link px-3 py-2 fs-5"
                  aria-current="page"
                  href="/"
                >
                  {" "}
                  {/* Added fs-5 for font size */}
                  Home
                </a>
                <a className="nav-link active px-3 py-2 fs-5" href="#">
                  Event Cration
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/login">
                  Login
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/registration">
                  Sign Up
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/cart">
                  Cart
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content goes here */}
        <main className="py-5">
          {" "}
          {/* Added py-5 for vertical padding */}
          <div className="event-page-content">
            <h1 className="mb-4">All Events</h1>{" "}
            {/* Added margin-bottom for spacing */}
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
                        <p className="card-text">{event.id}</p>
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
                          style={{ marginRight: "20px" }}
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/eventEdit`}
                          className="btn btn-success"
                          style={{ marginRight: "20px" }}
                        >
                          Edit Events
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-danger"
                          onClick={() => handleDelete(event.id)} // Fix here
                        >
                          Delete Event
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
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="fas fa-home me-3"></i> Brampton, ON, CA
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>{" "}
                    znpatel2003@gmail.com
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
    </>
  );
};

export default EventDeshboard;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom"; // Import useHistory for redirection
// import eventService from "../../services/eventService";

// const EventDashboard = () => {
//   const [events, setEvent] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const history = useHistory();

//   // Function to check if the user is an Admin
//   const isAdmin = () => {
//     const token = localStorage.getItem("token"); // Assuming you're storing JWT token in localStorage
//     if (!token) return false;

//     // Decode the token or use a library like jwt-decode to read the token (for a better implementation)
//     const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token (use a real decoding library for production)
//     return decodedToken.role === "Admin"; // Check if role is Admin
//   };

//   // Redirect non-admin users to home
//   useEffect(() => {
//     if (!isAdmin()) {
//       history.push("/"); // Redirect to home or another page
//     } else {
//       eventService
//         .getAllEvents()
//         .then((response) => {
//           setEvent(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching events:", error);
//           setLoading(false);
//         });
//     }
//   }, [history]);

//   const handleDelete = (id) => {
//     if (id > 0) {
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this event?"
//       );

//       if (confirmDelete) {
//         axios
//           .delete(`https://localhost:7166/api/Event/${id}`)
//           .then(() => {
//             getAllEvents(); // Reload events after successful deletion
//           })
//           .catch((error) => {
//             console.error("Error deleting event:", error);
//           });
//       }
//     }
//   };

//   return (
//     <>
//       <div className="content">
//         {/* Navbar and other content goes here */}

//         <main className="py-5">
//           {/* Added py-5 for vertical padding */}
//           <div className="event-page-content">
//             <h1 className="mb-4">All Events</h1>{" "}
//             {/* Added margin-bottom for spacing */}
//             {loading ? (
//               <p>Loading events...</p>
//             ) : events.length > 0 ? (
//               <div className="row">
//                 {events.map((event) => (
//                   <div key={event.id} className="col-md-4 mb-4">
//                     <div className="card event-card">
//                       <img
//                         src={event.image}
//                         alt={event.title}
//                         className="card-img-top"
//                         style={{ height: "200px", objectFit: "cover" }}
//                       />
//                       <div className="card-body">
//                         <p className="card-text">{event.id}</p>
//                         <h5 className="card-title">{event.title}</h5>
//                         <p className="card-text">
//                           <strong>Location:</strong> {event.location}
//                         </p>
//                         <p className="card-text">
//                           <strong>Date:</strong>{" "}
//                           {new Date(event.eventDate).toLocaleDateString()}
//                         </p>
//                         <Link
//                           to={`/eventDetails/${event.id}`}
//                           className="btn btn-primary"
//                           style={{ marginRight: "20px" }}
//                         >
//                           View Details
//                         </Link>
//                         <Link
//                           to={`/eventEdit`}
//                           className="btn btn-success"
//                           style={{ marginRight: "20px" }}
//                         >
//                           Edit Events
//                         </Link>
//                         <Link
//                           to="#"
//                           className="btn btn-danger"
//                           onClick={() => handleDelete(event.id)} // Fix here
//                         >
//                           Delete Event
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No events found</p>
//             )}
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="bg-dark text-white text-center">
//           {/* Footer content */}
//         </footer>
//       </div>
//     </>
//   );
// };

// export default EventDashboard;
