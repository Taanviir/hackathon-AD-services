import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SubmitInternalOpinion from './pages/SubmitInternalOpinion'; // Import the new page
import Navbar from './components/Navbar'; // Import Navbar
import Sidebar from './components/Sidebar'; // Import Sidebar

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    console.log(isLoggedIn);
    // Function to check if the user is authenticated
    const checkAuthStatus = () => {
        // For the sake of example, we'll simulate an authentication check.
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('access_token='));
        if (token) {
            console.log(token);
            console.log('User is authenticated');
            setIsLoggedIn(true);
        } else {
            console.log('User is not authenticated');
            setIsLoggedIn(false);
        }
    };

    // Check authentication status when the app mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const handleLogin = () => {
        // Simulate login action (after successfully logging in, set the token)
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Simulate logout action (clear the token, make an API call to logout, etc.)
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="flex flex-col h-screen">
                {isLoggedIn && <Navbar />}
                <div className="flex flex-1">
                    {isLoggedIn && <Sidebar />}
                    <div className="flex-1 p-8">
                        <Routes>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route
                                path="/"
                                element={isLoggedIn ? <Home /> : <Navigate to="/signup" />}
                            />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/submit-internal-opinion"
                                element={isLoggedIn ? <SubmitInternalOpinion /> : <Navigate to="/login" />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
