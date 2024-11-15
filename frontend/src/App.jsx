// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SubmitInternalOpinion from './pages/SubmitInternalOpinion'; // Import the new page
import Navbar from './components/Navbar'; // Import Navbar
import Sidebar from './components/Sidebar'; // Import Sidebar

const App = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen overflow-hidden">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar />
                    <div className="flex-1 p-8">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/submit-internal-opinion" element={<SubmitInternalOpinion />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;



// // src/App.jsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// import SubmitInternalOpinion from './pages/SubmitInternalOpinion'; // Import the new page
// import Navbar from './components/Navbar'; // Import Navbar
// import Sidebar from './components/Sidebar'; // Import Sidebar

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

//     const handleLogin = () => {
//         // Simulate a login action
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         // Simulate a logout action
//         setIsLoggedIn(false);
//     };

//     return (
//         <Router>
//             <div className="flex flex-col h-screen overflow-hidden">
//                 {isLoggedIn && <Navbar />}
//                 <div className="flex flex-1">
//                     {isLoggedIn && <Sidebar />}
//                     <div className="flex-1 p-8">
//                         <Routes>
//                             <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                             <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
//                             <Route path="/signup" element={<Signup />} />
//                             <Route path="/submit-internal-opinion" element={isLoggedIn ? <SubmitInternalOpinion /> : <Navigate to="/login" />} />
//                         </Routes>
//                     </div>
//                 </div>
//             </div>
//         </Router>
//     );
// };

// export default App;