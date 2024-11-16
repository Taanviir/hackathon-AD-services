// src/pages/SubmitInternalOpinion.jsx
import React, { useState } from "react";
import PriorityLevelSelector from "../components/PriorityLevelSelector";

const SubmitInternalOpinion = async () => {
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null); // State for the uploaded file

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // const response = await fetch("http://localhost:8000/api/zzzzz", {});
    console.log({
      requestTitle,
      requestDescription,
      priorityLevel,
      dueDate,
      file,
    });
    setRequestTitle("");
    setRequestDescription("");
    setPriorityLevel("");
    setDueDate("");
    setFile(null);
  };

  return (
    <div className="flex flex-col justify-center h-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-4 relative left-80 ms-10">
        Submit Internal Opinion Request
      </h1>

      <div className="w-[30vw] h-[71vh] flex-shrink-0 rounded-[20px] bg-[rgba(255,255,255,0.56)] p-6 relative left-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="requestTitle"
              className="block"
              style={{
                color: "#695D3C",
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              Request Title
            </label>
            <input
              type="text"
              id="requestTitle"
              value={requestTitle}
              onChange={(e) => setRequestTitle(e.target.value)}
              placeholder="Enter a concise title for the request"
              required
              className="mt-1 block w-[508px] h-[39px] rounded-[4px] bg-[rgba(191,186,174,0.72)] p-2 placeholder-[#695D3C]"
            />
          </div>
          <div>
            <label
              htmlFor="requestDescription"
              className="block"
              style={{
                color: "#695D3C",
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              Request Description
            </label>
            <textarea
              id="requestDescription"
              value={requestDescription}
              onChange={(e) => setRequestDescription(e.target.value)}
              placeholder="Provide a detailed description of your request, including any specific requirements or context..."
              required
              rows="4"
              className="mt-1 block w-[508px] h-[151.649px] rounded-[4px] bg-[rgba(191,186,174,0.72)] p-2 placeholder-[#695D3C]"
            />
          </div>
          <PriorityLevelSelector />
          <div className="flex flex-col">
            <div
              className="w-[309px] h-[104px] flex-shrink-0 rounded-[4px] bg-[rgba(191,186,174,0.72)] flex flex-col items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("fileUpload").click()} // Trigger file input on click
            >
              <span
                style={{
                  color: "#695D3C",
                  fontSize: "20px",
                  fontWeight: 400,
                }}
              >
                Upload Supporting Resources
              </span>
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the file input
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-2"
              >
                <path
                  d="M3 16.5V18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75V16.5M7.5 7.5L12 3M12 3L16.5 7.5M12 3V16.5"
                  stroke="#695D3C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block"
              style={{
                color: "#695D3C",
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="mt-1 block w-[50%] h-[39px] rounded-[4px] bg-[rgba(191,186,174,0.72)] p-2"
            />
          </div>
          <div className="flex justify-end me-5">
            <button
              type="submit"
              className="mt-4 w-[20%] py-2 bg-gold-900 text-white rounded-lg hover:bg-gold-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitInternalOpinion;
