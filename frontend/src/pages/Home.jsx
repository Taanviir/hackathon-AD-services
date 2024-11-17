import React, { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle search
  const handleSearch = async () => {
    if (!query) return; // Exit if the query is empty
    setIsLoading(true); // Set loading state
    setSearching(true); // Set searching state

    try {
      const apiKey = process.env.OPENAI_API_KEY; // Ensure your API key is set in your environment variables
      const apiUrl = "https://api.openai.com/v1/chat/completions";

      // Fetch response from OpenAI API
      const result = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4", // Specify the model you want to use
          messages: [
            {
              role: "system",
              content:
                "You are a professional assistant specialized in research and corporate benchmarking. Provide concise, reliable, and well-sourced information from authoritative sources like industry reports, government publications, and research institutions.",
            },
            {
              role: "user",
              content: query,
            },
          ],
        }),
      });
      const data = await result.json();
      const message =
        data.choices?.[0]?.message?.content || "No response received.";
      setResponse(message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Failed to retrieve data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`overflow-hidden ${searching ? "pt-5" : ""}`}>
      {/* Animated Logo and Search Bar */}
      <div
        className={`flex flex-col absolute ${
          searching ? "left-16 top-6" : "left-[45%] top-[40%]"
        } transition-all duration-500`}
      >
        <img
          src="/SmartGovLogo.svg"
          alt="smart gov logo"
          className={`pb-5 ${
            searching ? "h-10" : "h-20"
          } transition-all duration-500`}
        />
      </div>
      <div
        className={`flex flex-col absolute ${
          searching ? "left-[45%] top-5" : "left-[45%] top-[48%]"
        } transition-all duration-500`}
      >
        <div className="relative flex-shrink-0 mx-3 w-[160%] max-w-[1000px] left-[-15%]">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
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

      {/* Loading and Response Section */}
      <div className="mt-20 px-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          response && (
            <div className="bg-[rgba(255,255,255,0.56)] p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Search Results</h3>
              <p>{response}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
