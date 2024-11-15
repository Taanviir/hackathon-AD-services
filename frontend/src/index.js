import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18+
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";
import InternalOpinionRequestForm from "./InternalOpinionRequestForm";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root element

root.render(
  <React.StrictMode>
    <App />
    <h1>Login</h1>
    <Login />
    <h1>Sign Up</h1>
    <Signup />
    <h1>Internal Request Form</h1>
    <InternalOpinionRequestForm />
  </React.StrictMode>
);
