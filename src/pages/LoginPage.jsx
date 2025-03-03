import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in with:", email, password);
  };

  return (
    <div className="login-page">
      {/* Header */}
      <div className="login-page-header">
        <div className="logo">EventPlanner</div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2025 EventPlanner. All rights reserved.</p>
        <nav>
          <a href="/about-us">About Us</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
      </div>
    </div>
  );
};

export default LoginPage;
