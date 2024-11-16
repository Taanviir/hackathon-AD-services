// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DepartmentSelect from "../components/DepartmentDropDown";
import PositionSelect from "../components/PositionDropDown";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [department, setDepartment] = useState("");
  let [position, setPosition] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    if (department === "") {
      department = "Sales";
    }
    if (position === "") {
      position = "Manager";
    }

    console.log("Department:", department);
    console.log("positon:", position);
    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: name,
          email,
          password,
          department,
          position,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        setSuccessMessage("Signup successful!"); // Set success message
        setErrorMessage(""); // Clear error message
        // Optionally, reset the form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDepartment("");
        setPosition("");
        // route it the home page
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Signup failed!"); // Set error message from response
        setSuccessMessage(""); // Clear success message
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again."); // Handle network errors
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-[rgba(255,255,255,0.6)] rounded-lg shadow-whiteGold">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-lg" role="alert">
            {successMessage}
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
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
          <DepartmentSelect />
          <PositionSelect />
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
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
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gold-700 rounded-lg hover:bg-gold-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-gold-800 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;



// // src/pages/Signup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import DepartmentSelect from "../components/DepartmentDropDown";
// import PositionSelect from "../components/PositionDropDown";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [department, setDepartment] = useState("");
//   const [position, setPosition] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log("Name:", name);
//     console.log("Email:", email);
//     console.log("Password:", password);
//     console.log("Department:", department);
//     console.log("Position:", position);
//     // Add API call for signup here
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="w-full max-w-md p-8 bg-[rgba(255,255,255,0.6)] rounded-lg shadow-whiteGold">
//         <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block mb-2 text-sm font-medium">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-2 text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
//               required
//             />
//           </div>
//           <DepartmentSelect />
//           <PositionSelect />
//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-2 text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="confirm-password"
//               className="block mb-2 text-sm font-medium"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirm-password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-bold text-white bg-gold-700 rounded-lg hover:bg-gold-500"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-gold-800 hover:underline">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;