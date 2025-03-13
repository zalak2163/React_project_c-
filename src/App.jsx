import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/components/Login";
import Registration from "../src/components/Registration";
import Event from "../src/components/Users/Event";
import EventDetails from "../src/components/Users/EventDetails";
import Profile from "../src/components/Users/Profile";
import Home from "../src/components/Users/Home";
import Cart from "../src/components/Users/Cart";
import ProfileEdit from "./components/Users/ProfileEdit";
import EventCration from "./components/Users/EventCration";

import { CartProvider } from "./components/Users/CartContext"; // Import CartProvider

const App = () => {
  // const userRole = localStorage.getItem("userRole"); // Get the current user role

  return (
    <CartProvider>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/eventDetails/:id" element={<EventDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/eventCration" element={<EventCration />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
