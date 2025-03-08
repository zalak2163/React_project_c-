import React from "react";

const Dashboard = () => {
  return (
    <>
      <>
        <div className="content">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
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
                <div className="navbar-nav">
                  <a className="nav-link " aria-current="page" href="/home">
                    Home
                  </a>
                  <a className="nav-link active" href="#">
                    Events
                  </a>
                  <a className="nav-link" href="/">
                    Login
                  </a>
                  <a className="nav-link" href="/registration">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main content goes here */}

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
    </>
  );
};

export default Dashboard;
