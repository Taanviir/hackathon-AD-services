import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SubmitInternalOpinion from './pages/SubmitInternalOpinion';
import Sidebar from './components/Sidebar';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthStatus = () => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('access_token='));
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
    };

    return (
        <Router>
            <div className="flex flex-col h-screen">
                <div className="flex flex-1">
                    {isLoggedIn && <Sidebar />}
                    <div className="flex-1 p-8">
                        <Routes>
                            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                            <Route
                                path="/"
                                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                            />
                            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
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