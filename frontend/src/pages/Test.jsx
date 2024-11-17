import React from 'react';
import './Home.css'; // Import the CSS file for styles

const Test = () => {
    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a skeleton page for the Test component.</p>
            <div className="loading-animation">
            <div className="loading-rectangle"></div>
            <div className="loading-rectangle"></div>
            <div className="loading-rectangle mb-6"></div>

            <div className="loading-rectangle"></div>
            <div className="loading-rectangle"></div>
            <div className="loading-rectangle mb-6"></div>

            <div className="loading-rectangle"></div>
            <div className="loading-rectangle"></div>
            <div className="loading-rectangle mb-6"></div>

            <div className="loading-rectangle"></div>
            <div className="loading-rectangle"></div>
            <div className="loading-rectangle mb-6"></div>
          </div>
        </div>
    );
};

export default Test;