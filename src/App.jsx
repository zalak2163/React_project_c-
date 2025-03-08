import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"; // Removed unused Router
import Login from "../src/components/Login";
import Registration from "../src/components/Registration";
import Dashboard from "../src/components/Users/Dashboard";
import Event from "../src/components/Users/Event";
import EventDetails from "../src/components/Users/EventDetails";
import Profile from "../src/components/Users/Profile";
import Home from "../src/components/Users/Home";
import Cart from "../src/components/Users/Cart";
import ProfileEdit from "./components/Users/ProfileEdit";
import EventCration from "./components/Users/EventCration";
import EventEdit from "./components/Users/EventEdit";
import EventDeshboard from "./components/Users/EventDeshboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Assume you have this component for protecting routes

const App = () => {
  return (
    <BrowserRouter>
      {/* Navigation Bar (Uncomment if needed) */}
      {/* <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/registration">
              Registration
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/event">
              Event
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/eventDetails">
              EventDetails
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/cart">
              Cart
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/eventCration">
              EventCreation
            </NavLink>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              component={Dashboard}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route path="/event" element={<Event />} />
        <Route path="/eventDetails/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profileEdit" element={<ProfileEdit />} />
        <Route
          path="/eventCration"
          element={
            <ProtectedRoute component={EventCration} allowedRoles={["Admin"]} />
          }
        />
        <Route path="/eventEdit" element={<EventEdit />} />
        <Route path="/eventDashboard" element={<EventDeshboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
