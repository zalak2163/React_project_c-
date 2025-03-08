import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'
import App from "./App";

// Create a root element using createRoot()
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />); // Use the render method on the root object
