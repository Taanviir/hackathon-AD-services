import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Research from "./pages/Research";
import RequestInternalOpinion from "./pages/RequestInternalOpinion";
import Sidebar from "./components/Sidebar";

// development
import Test from "./pages/Test";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("access_token="));
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch("http://localhost:8000/api/logout/", {
        method: "GET",
        credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          // If logout is successful, navigate to the login page
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred during logout:", error);
      });
  };

//   {/* Logout Button */}
//   <button
//   onClick={handleLogout}
//   className={`block bottom-4 left-4 w-[calc(100%-2rem)] py-2 px-4 text-left text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded ${
//   isCollapsed ? "w-8 h-8 flex items-center justify-center text-sm" : ""
//   }`}
// >
//   {isCollapsed ? "↩" : "Logout"}
// </button>

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <img
          src="/SmartGovLogo.svg"
          alt="smart gov logo"
          className="absolute left-20 top-6 h-10 pb-5"
        />
        <div className="flex flex-1">
          {isLoggedIn && <Sidebar />}
          <div className="flex-1 p-8">
            <Routes>
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/request-internal-opinion"
                element={
                  isLoggedIn ? (
                    <RequestInternalOpinion />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/research"
                element={isLoggedIn ? <Research /> : <Navigate to="/login" />}
              />
              {/* development page */}
              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import Research from "./pages/Research";
// import RequestInternalOpinion from "./pages/RequestInternalOpinion";
// import Sidebar from "./components/Sidebar";

// // development
// import Test from "./pages/Test";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const location = useLocation(); // Get the current location

//   const checkAuthStatus = () => {
//     const token = document.cookie
//       .split(";")
//       .find((cookie) => cookie.trim().startsWith("access_token="));
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Conditionally render the logo */}
//       {location.pathname !== "/research" && (
//         <img
//           src="/SmartGovLogo.svg"
//           alt="smart gov logo"
//           className="absolute h-14 mt-2 ms-14 p-4"
//         />
//       )}
//       <div className="flex flex-1">
//         {isLoggedIn && <Sidebar />}
//         <div className="flex-1 p-8">
//           <Routes>
//             <Route
//               path="/login"
//               element={
//                 isLoggedIn ? (
//                   <Navigate to="/" />
//                 ) : (
//                   <Login onLogin={handleLogin} />
//                 )
//               }
//             />
//             <Route
//               path="/"
//               element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
//             />
//             <Route
//               path="/signup"
//               element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
//             />
//             <Route
//               path="/request-internal-opinion"
//               element={
//                 isLoggedIn ? (
//                   <RequestInternalOpinion />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/research"
//               element={isLoggedIn ? <Research /> : <Navigate to="/login" />}
//             />
//             {/* development page */}
//             <Route path="/test" element={<Test />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default AppWrapper;
