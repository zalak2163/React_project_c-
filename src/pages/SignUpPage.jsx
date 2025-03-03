import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import "../styles/SignUpPage.css"; // Updated CSS

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Signing up with", email, password, name, phone);
  };

  return (
    <div className="signup-page">
      {/* Header with "Login" navigation */}
      <header className="signup-page-header">
        <div className="logo">
          <h2>EventPlanner</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link> {/* Navigate to Login */}
            </li>
          </ul>
        </nav>
      </header>

      {/* Sign Up Form */}
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>

        {/* Link to navigate to Login page */}
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 EventPlanner</p>
        <div>
          <a href="/about-us">About Us</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
