import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const navigate = useNavigate();

  function EditEvent() {
    if (
      !id ||
      !title ||
      !description ||
      !eventDate ||
      !location ||
      !organizerName ||
      !organizerId ||
      !ticketType ||
      !ticketPrice ||
      !ticketQuantity ||
      !ticketAvailable
    ) {
      alert("All fields are required!");
      return;
    }

    let items = {
      id,
      title,
      description,
      eventDate,
      location,
      image,
      organizerName,
      organizerId,
      tickets: [
        {
          ticketType,
          price: ticketPrice,
          quantity: ticketQuantity,
          available: ticketAvailable,
        },
      ],
    };

    fetch(`https://localhost:7166/api/Event/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(items),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        navigate("/login");
      });
    });
  }

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
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="Event Id"
                              />
                            </div>
                          </div>

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
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-ticket-alt fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                value={ticketType}
                                onChange={(e) => setTicketType(e.target.value)}
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
                                onChange={(e) => setTicketPrice(e.target.value)}
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
                                }
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
                                }
                                placeholder="Tickets Available"
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            {/* <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                              onClick={EditEvent}
                              
                            >
                              Create Event
                            </button> */}
                            <Link
                              to={`/eventCration`}
                              className="btn btn-primary"
                            >
                              Edit Event
                            </Link>
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

export default EventEdit;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const EventCreation = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [image, setImage] = useState("");
//   const [organizerName, setOrganizerName] = useState("");
//   const [organizerId, setOrganizerId] = useState("");
//   const [ticketType, setTicketType] = useState("");
//   const [ticketPrice, setTicketPrice] = useState(0);
//   const [ticketQuantity, setTicketQuantity] = useState(0);
//   const [ticketAvailable, setTicketAvailable] = useState(0);
//   const navigate = useNavigate();

//   function AddUser() {
//     // Check if the required fields are filled
//     if (
//       !title ||
//       !description ||
//       !eventDate ||
//       !location ||
//       !organizerName ||
//       !organizerId ||
//       !ticketType ||
//       !ticketPrice ||
//       !ticketQuantity ||
//       !ticketAvailable
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     let items = {
//       title,
//       description,
//       eventDate,
//       location,
//       image,
//       organizerName,
//       organizerId,
//       tickets: [
//         {
//           ticketType,
//           price: ticketPrice,
//           quantity: ticketQuantity,
//           available: ticketAvailable,
//         },
//       ],
//     };

//     fetch(`https://localhost:7166/api/Event`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(items),
//     }).then((result) => {
//       result.json().then((resp) => {
//         console.log(resp);
//         navigate("/login");
//       });
//     });
//   }

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             <img
//               src="https://images.squarespace-cdn.com/content/v1/64b168715a58c023012b3a74/d2088bb5-d583-4e07-b4c2-55d3d1b680c9/Z+logo+no+background.png?format=1500w"
//               alt="Logo"
//               style={{ width: "150px", height: "auto" }}
//             />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavAltMarkup"
//             aria-controls="navbarNavAltMarkup"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//             <div className="navbar-nav ms-auto py-3 px-4">
//               <a
//                 className="nav-link px-3 py-2 fs-5"
//                 aria-current="page"
//                 href="/"
//               >
//                 Home
//               </a>
//               <a className="nav-link px-3 py-2 fs-5" href="/event">
//                 Events
//               </a>
//               <a className="nav-link px-3 py-2 fs-5" href="/login">
//                 Login
//               </a>
//               <a className="nav-link active px-3 py-2 fs-5" href="#">
//                 Sign Up
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main>
//         <section className="vh-100" style={{ backgroundColor: "#eee" }}>
//           <div className="container h-100">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//               <div className="col-lg-12 col-xl-11">
//                 <div
//                   className="card text-black"
//                   style={{ borderRadius: "25px" }}
//                 >
//                   <div className="card-body p-md-5">
//                     <div className="row justify-content-center">
//                       {/* Form column now on the right */}
//                       <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
//                         <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
//                           Event Creation
//                         </p>

//                         <div className="mx-1 mx-md-4">
//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-user fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 placeholder="Event Title"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 placeholder="Event Description"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={eventDate}
//                                 onChange={(e) => setEventDate(e.target.value)}
//                                 placeholder="Event Date"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-location-pin fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                                 placeholder="Event Location"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-image fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="url"
//                                 className="form-control"
//                                 value={image}
//                                 onChange={(e) => setImage(e.target.value)}
//                                 placeholder="Event Image URL"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-user-circle fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={organizerName}
//                                 onChange={(e) =>
//                                   setOrganizerName(e.target.value)
//                                 }
//                                 placeholder="Organizer Name"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-id-card fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={organizerId}
//                                 onChange={(e) => setOrganizerId(e.target.value)}
//                                 placeholder="Organizer ID"
//                               />
//                             </div>
//                           </div>

//                           {/* Ticket Information */}
//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-ticket-alt fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={ticketType}
//                                 onChange={(e) => setTicketType(e.target.value)}
//                                 placeholder="Ticket Type"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-dollar-sign fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 value={ticketPrice}
//                                 onChange={(e) => setTicketPrice(e.target.value)}
//                                 placeholder="Ticket Price"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-box fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 value={ticketQuantity}
//                                 onChange={(e) =>
//                                   setTicketQuantity(e.target.value)
//                                 }
//                                 placeholder="Ticket Quantity"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-check-circle fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 value={ticketAvailable}
//                                 onChange={(e) =>
//                                   setTicketAvailable(e.target.value)
//                                 }
//                                 placeholder="Tickets Available"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                             <button
//                               type="submit"
//                               className="btn btn-primary btn-lg"
//                               onClick={AddUser}
//                             >
//                               Create Event
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                       {/* Image column */}
//                       <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-2 order-lg-1">
//                         <img
//                           src="https://st4.depositphotos.com/2894069/23242/v/450/depositphotos_232426726-stock-illustration-card-winter-holidays-corporate-party.jpg"
//                           className="img-fluid"
//                           alt="Event"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-dark text-white text-center">
//         <div className="container p-4 pb-0">
//           <section className="mb-4">
//             <a
//               className="btn text-white btn-floating m-1"
//               style={{ backgroundColor: "#3b5998" }}
//               href="https://www.facebook.com"
//               role="button"
//             >
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a
//               className="btn text-white btn-floating m-1"
//               style={{ backgroundColor: "#dd4b39" }}
//               href="https://mail.google.com"
//               role="button"
//             >
//               <i className="fab fa-google"></i>
//             </a>
//             <a
//               className="btn text-white btn-floating m-1"
//               style={{ backgroundColor: "#ac2bac" }}
//               href="https://www.instagram.com"
//               role="button"
//             >
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a
//               className="btn text-white btn-floating m-1"
//               style={{ backgroundColor: "#0082ca" }}
//               href="https://www.linkedin.com"
//               role="button"
//             >
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//             <a
//               className="btn text-white btn-floating m-1"
//               style={{ backgroundColor: "#55acee" }}
//               href="https://twitter.com"
//               role="button"
//             >
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a
//               className="btn text-white btn-floating m-1"
//               style={{ backgroundColor: "#333333" }}
//               href="https://github.com"
//               role="button"
//             >
//               <i className="fab fa-github"></i>
//             </a>
//           </section>
//         </div>

//         <section className="mb-4">
//           <div className="container text-center text-md-start mt-5">
//             <div className="row mt-3">
//               <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
//                 <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
//                 <p>
//                   <i className="fas fa-home me-3"></i> Brampton, ON, CA
//                 </p>
//                 <p>
//                   <i className="fas fa-envelope me-3"></i> znpatel2003@gmail.com
//                 </p>
//                 <p>
//                   <i className="fas fa-phone me-3"></i> +1 (204-595-4790)
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div
//           className="text-center p-3"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
//         >
//           © 2025 Copyright
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default EventCreation;
