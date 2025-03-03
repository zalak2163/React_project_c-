import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage"; // EventPage will now show all events
import EventDetailPage from "./pages/EventDetailPage"; // New page for individual event details
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CheckoutPage from "./pages/CheckoutPage"; // import CheckoutPage
import EventCreationPage from "./pages/EventCreationPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage */}
          <Route path="/events" element={<EventPage />} />{" "}
          {/* EventPage for all events */}
          <Route path="/event/:id" element={<EventDetailPage />} />{" "}
          {/* EventDetailsPage for individual event */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* Define route for checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/EventCreationPage" element={<EventCreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
