import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18+
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root element

root.render(
  <React.StrictMode>
    <App />
    <h1>Login</h1>
    <Login />
    <h1>Sign Up</h1>
    <Signup />
  </React.StrictMode>
);
