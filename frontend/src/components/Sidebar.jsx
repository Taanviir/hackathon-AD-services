// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  return (
    <aside className="w-[18rem] h-full p-4 bg-[#BFBAAE50] shadow-lg">
      <ul className="space-y-4 ms-1">
        {location.pathname === "/" ? ( // Check if the current path is Home
          <li className="text-lg font-semibold mt-5 ms-1">
            <Link
              to="/submit-internal-opinion" // Link to Submit Internal Opinion Request
              className="block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded"
            >
              Submit Internal Opinion Request
            </Link>
          </li>
        ) : ( // If not on Home page, show the Home link
          <li className="text-lg font-semibold mt-5 ms-1">
            <Link
              to="/" // Link to Home
              className="block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded"
            >
              Home
            </Link>
          </li>
        )}
        <div className="w-[246px] h-[2px] bg-[#695D3C]"></div>
        {/* Line Separator */}
        <li className="text-lg font-semibold ms-1">
          <Link
            to="/history" // Link to History
            className="block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded"
          >
            History
          </Link>
        </li>
        {/* Line Separator */}
      </ul>
    </aside>
  );
};

export default Sidebar;