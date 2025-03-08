import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // For the checkbox
  const [loading, setLoading] = useState(false); // For loading state
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const navigate = useNavigate();

  // Function to handle form submission
  function GetLoginDetails() {
    if (!email || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    // Prepare the login details
    let items = { email, password, rememberMe };

    // Show loading state while waiting for the response
    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    // Make the API call to login
    fetch("https://localhost:7166/api/Auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(items),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Invalid email or password");
        }
        return result.json();
      })
      .then((resp) => {
        if (resp.message === "Login successful") {
          // Store the JWT token in localStorage if 'Remember Me' is checked
          if (rememberMe) {
            localStorage.setItem("token", resp.token); // Assuming token is in response
          } else {
            sessionStorage.setItem("token", resp.token);
          }
          navigate("/"); // Redirect to home page on successful login
        } else {
          setErrorMessage(resp.message || "Login failed"); // Display message from server
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage(error.message || "An error occurred during login.");
      })
      .finally(() => {
        setLoading(false); // Hide loading state once the request is done
      });
  }

  return (
    <>
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
              <a className="nav-link active px-3 py-2 fs-5" href="#">
                Login
              </a>
              <a className="nav-link px-3 py-2 fs-5" href="/registration">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Login
            </p>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Remember me checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="form1Example3"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={GetLoginDetails}
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

            {/* Other social icons */}
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2025 Copyright
        </div>
      </footer>
    </>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false); // New state for the checkbox
//   const navigate = useNavigate();

//   function GetLoginDetails() {
//     let items = { email, password, rememberMe };

//     // Log the request for debugging purposes
//     console.warn(items);

//     fetch("https://localhost:7166/api/Auth/login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(items),
//     })
//       .then((result) => {
//         if (!result.ok) {
//           // If status code is not OK (200), throw an error
//           throw new Error("Invalid email or password");
//         }
//         return result.json();
//       })
//       .then((resp) => {
//         console.warn(resp); // Log the response from the server
//         if (resp.message === "Login successful") {
//           // Save user details in localStorage
//           localStorage.setItem("user", JSON.stringify(resp.user)); // Store user data
//           navigate("/profile"); // Navigate to the profile page upon successful login
//         } else {
//           alert(resp.message || "Login failed"); // Show message returned from backend
//         }
//       })
//       .catch((error) => {
//         // Handle any errors (network issues, or backend errors)
//         console.error("Login error:", error);
//         alert(error.message || "An error occurred during login.");
//       });
//   }

//   return (
//     // Your login form JSX remains the same
//   );
// };

// export default Login;
