// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col absolute left-[45%] top-[40%]">
        <img src="/SmartGovLogo.svg" alt="smart gov logo" className="pb-5" />
        <div className="relative flex-shrink-0 mx-3 w-[120%] max-w-[800px] left-[-15%]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-[41px] rounded-[14.5px] border border-gold-800 bg-[rgba(255,255,255,0.47)] pl-10 focus:outline-none focus:border-gray-400 placeholder:text-gold-700"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M19.2497 19.25L14.4858 14.4861M14.4858 14.4861C15.7752 13.1967 16.4995 11.448 16.4995 9.62453C16.4995 7.80109 15.7752 6.05234 14.4858 4.76298C13.1965 3.47362 11.4477 2.74927 9.62428 2.74927C7.80085 2.74927 6.0521 3.47362 4.76274 4.76298C3.47338 6.05234 2.74902 7.80109 2.74902 9.62453C2.74902 11.448 3.47338 13.1967 4.76274 14.4861C6.0521 15.7754 7.80085 16.4998 9.62428 16.4998C11.4477 16.4998 13.1965 15.7754 14.4858 14.4861Z"
                stroke="#504201"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
