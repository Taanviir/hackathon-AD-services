import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    // Example API call for login
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies if needed
      });

      if (response.ok) {
        // If login is successful, navigate to the home page
        navigate("/"); // Redirect to home page
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.detail);
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <img
        src="/VectorBg.svg"
        alt="vector bg"
        className="top-[0%] left-[0%] absolute w-full"
      />
      <div className="absolute left-[36%] top-[20%]">
        <div className="ms-2">
          <img
            src="/SmartGovLogo.svg"
            alt="smartGov logo"
            className="mb-8 ms-20"
          />
        </div>
        <div className="p-8 bg-[rgba(255,255,255,0.7)] rounded-lg w-[120%] shadow-whiteGold">
          <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-lg font-medium ms-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium ms-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 font-bold text-white bg-gold-700 rounded-lg hover:bg-gold-500"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gold-800 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;