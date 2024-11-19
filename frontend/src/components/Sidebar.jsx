import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`h-full bg-[#BFBAAE50] shadow-lg  transition-all duration-300 ${
        isCollapsed ? "w-14 pt-1" : "w-[18rem] pt-1 px-3"
      }`}
    >
      <div className={`mt-2 p-2 pt-3 ${isCollapsed ? "flex justify-center" : "flex justify-end"}`}>
        <img
          src="collapse.svg"
          alt="collapse icon"
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
      </div>
      <div className="my-5 w-full h-[2px] bg-[#695D3C]"></div>
      <ul className="space-y-4">
        {/* Other sidebar links */}
        <li className={`text-lg font-semibold mt-5 ${isCollapsed ? "flex justify-center" : ""}`}>
          <Link
            to="/"
            className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? <img src="/home.svg" alt="home logo"></img> : "Home"}
          </Link>
        </li>
        <div className="w-full h-[2px] bg-[#695D3C]"></div>
        <li className={`text-lg font-semibold mt-5 ${isCollapsed ? "flex justify-center" : ""}`}>
          <Link
            to="/research"
            className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? <img src="/research.svg" alt="research logo"></img> : "Research"}
          </Link>
        </li>
        <div className="w-full h-[2px] bg-[#695D3C]"></div>
        <li className={`text-lg font-semibold mt-5 ${isCollapsed ? "flex justify-center" : ""}`}>
          <Link
            to="/request-internal-opinion"
            className={`block py-2 px-4 text-left text-gold-900 transition duration-200 ease-in-out border border-transparent hover:bg-[rgba(158,146,96,0.4)] hover:text-white rounded ${
              isCollapsed ? "text-center" : ""
            }`}
          >
            {isCollapsed ? <img src="/opinionForm.svg" alt="opinion form logo"></img> : "Request Internal Opinion"}
          </Link>
        </li>
        <div className="w-full h-[2px] bg-[#695D3C]"></div>
      </ul>
      <button
        onClick={onLogout}
        className={`flex justify-center align-center block py-2 text-left text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded ${
          isCollapsed ? "w-[80%] mt-[62vh] mx-1 px-1" : "w-[88%] mx-4 mt-[60vh] px-4"
        }`}
        aria-label="Logout"
      >
        {isCollapsed ? "↩" : "Logout"}
      </button>
    </aside>
  );
};

export default Sidebar;
