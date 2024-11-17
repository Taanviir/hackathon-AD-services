// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  return (
    <aside
      className={`h-full p-4 bg-[#BFBAAE50] shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-[18rem]"
      }`}
    >
      <div className="flex justify-end mt-2">
        <img
          src="collapse.svg"
          alt="collapse icon"
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
      </div>
      <div className="my-5 w-full h-[2px] bg-[#695D3C]"></div>
      <ul className="space-y-4 ms-1">
        {location.pathname === "/" ? (
          <li className="text-lg font-semibold mt-5 ms-1">
            <Link
              to="/submit-internal-opinion"
              className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
                isCollapsed ? "text-center" : ""
              }`}
            >
              {isCollapsed ? "" : "Submit Internal Opinion Request"}
            </Link>
          </li>
        ) : (
          <li className="text-lg font-semibold mt-5 ms-1">
            <Link
              to="/"
              className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
                isCollapsed ? "text-center" : ""
              }`}
            >
              {isCollapsed ? "" : "Home"}
            </Link>
          </li>
        )}
        <div className="w-full h-[2px] bg-[#695D3C]"></div>
        <li className="text-lg font-semibold ms-1">
          <Link
            to="/history"
            className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? "" : "History"}
          </Link>
        </li>
        <div className="w-full h-[2px] bg-[#695D3C]"></div>
        <li className="text-lg font-semibold ms-1">
          <Link
            to="/test"
            className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? "" : "Test"}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
