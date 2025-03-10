import React from "react";

const Profile = () => {
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
                }
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
                <a className="nav-link active px-3 py-2 fs-5 active" href="#">
                  Profile
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/login">
                  Login
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/registration">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main>
          <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-8 mb-4 mb-lg-0">
                  <div
                    className="card mb-3"
                    style={{
                      borderRadius: ".5rem",
                      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="row g-0">
                      <div
                        className="col-md-4 gradient-custom text-center text-white"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                          background:
                            "linear-gradient(to right, #6a11cb, #2575fc)", // Added gradient background
                          paddingTop: "50px", // Adjusted padding for better centering
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png"
                          alt="Avatar"
                          className="img-fluid my-5"
                          style={{
                            width: "120px", // Increased size of profile picture
                            height: "120px", // Ensuring it's a square
                            borderRadius: "50%", // Circular shape
                            border: "5px solid #fff", // White border around the image
                            transition: "all 0.3s ease-in-out", // Smooth hover transition
                          }}
                        />
                        <h4 style={{ color: "white", fontSize: "24px" }}>
                          Marie Horwitz
                        </h4>
                        <p style={{ color: "white", fontSize: "18px" }}>
                          Web Designer
                        </p>
                        <a
                          href="/profileEdit"
                          className="far fa-edit mb-5"
                          style={{
                            color: "white",
                            fontSize: "22px",
                            cursor: "pointer",
                            transition: "color 0.3s ease-in-out",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = "#ffd700";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = "white";
                          }}
                        ></a>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-4">
                          <h5 style={{ fontSize: "22px", fontWeight: "600" }}>
                            Information
                          </h5>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6 style={{ fontSize: "30px" }}>Email</h6>
                              <p
                                className="text-muted"
                                style={{ fontSize: "20px" }}
                              >
                                marie@example.com
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6 style={{ fontSize: "30px" }}>Phone</h6>
                              <p
                                className="text-muted"
                                style={{ fontSize: "20px" }}
                              >
                                123 456 789
                              </p>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6 style={{ fontSize: "30px" }}>Name</h6>
                              <p
                                className="text-muted"
                                style={{ fontSize: "20px" }}
                              >
                                Marie Horwitz
                              </p>
                            </div>
                          </div>
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

export default Profile;
