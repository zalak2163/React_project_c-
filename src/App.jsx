import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "./components/Users/ProtectedRoute";
import CheckoutPage from "./components/Users/CheckoutPage";
import { CartProvider } from "./components/Users/CartContext"; // Import CartProvider

const App = () => {
  const userRole = localStorage.getItem("userRole"); // Get the current user role

  return (
    <CartProvider>
      {" "}
      {/* Wrap the entire routing with CartProvider */}
      <BrowserRouter>
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
          <Route path="/checkoutPage" element={<CheckoutPage />} />
          <Route path="/eventDashboard" element={<EventDeshboard />} />
          <Route path="/eventEdit" element={<EventEdit />} />
          <Route path="/eventCration" element={<EventCration />} />

          {/* Admin Specific Routes - Only render if the user is an admin */}
          {/* {userRole === "Admin" && ( */}
          <>
            {/* <Route
                path="/eventCration"
                element={
                  <ProtectedRoute
                    component={EventCration}
                    allowedRoles={["Admin"]}
                  />
                }
              /> */}
            {/* <Route
                path="/eventEdit"
                element={
                  <ProtectedRoute
                    component={EventEdit}
                    allowedRoles={["Admin"]}
                  />
                }
              /> */}
            {/* <Route
                path="/eventDashboard"
                element={
                  <ProtectedRoute
                    component={EventDeshboard}
                    allowedRoles={["Admin"]}
                  />
                }
              /> */}
          </>
          {/* )} */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
