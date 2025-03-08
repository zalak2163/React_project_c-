import React from "react";

const Cart = () => {
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
                {/* Increased padding here */}
                <a className="nav-link px-3 py-2 fs-5" href="/home">
                  {/* Added fs-5 for font size */}
                  Home
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/event">
                  Events
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/">
                  Login
                </a>
                <a className="nav-link px-3 py-2 fs-5" href="/registration">
                  Sign Up
                </a>
                <a
                  className="nav-link active px-3 py-2 fs-5"
                  aria-current="page"
                  href="#"
                >
                  Cart
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content goes here */}
        <main>
          <section
            className="vh-100"
            style={{ backgroundColor: "#fdccbc" }} // Corrected style attribute
          >
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                  <p>
                    <span className="h2">Shopping Cart </span>
                    <span className="h4">(1 item in your cart)</span>
                  </p>

                  <div className="card mb-4">
                    <div className="card-body p-4">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                            className="img-fluid"
                            alt="Generic placeholder image"
                          />
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Name</p>
                            <p className="lead fw-normal mb-0">iPad Air</p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Color</p>
                            <p className="lead fw-normal mb-0">
                              <i
                                className="fas fa-circle me-2"
                                style={{ color: "#fdd8d2" }}
                              ></i>
                              pink rose
                            </p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">
                              Quantity
                            </p>
                            <p className="lead fw-normal mb-0">1</p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Price</p>
                            <p className="lead fw-normal mb-0">$799</p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Total</p>
                            <p className="lead fw-normal mb-0">$799</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mb-5">
                    <div className="card-body p-4">
                      <div className="float-end">
                        <p className="mb-0 me-5 d-flex align-items-center">
                          <span className="small text-muted me-2">
                            Order total:
                          </span>{" "}
                          <span className="lead fw-normal">$799</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-light btn-lg me-2">
                      Continue shopping
                    </button>
                    <button type="button" className="btn btn-primary btn-lg">
                      CHECKOUT
                    </button>
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

export default Cart;
