// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold">Welcome Back, aikram</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;