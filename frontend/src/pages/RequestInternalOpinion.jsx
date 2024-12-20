import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PriorityLevelSelector from "../components/PriorityLevelSelector";
import Alert from "../components/Alert";
import "../components/loading.css";

const RequestInternalOpinion = () => {
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = document.getElementById("opinionRequestForm");
    const formData = new FormData(form);
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch(
        "http://localhost:8000/api/opinion_request/",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/", {
          state: { alertMessage: "Request submitted successfully!" },
        });
      } else {
        setResponseMessage(`Failed to submit the request.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setResponseMessage("An error occurred while submitting the request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-4 relative left-80 ms-24">
        Request Internal Opinion
      </h1>

      <div className="w-[550px] h-[730px] flex-shrink-0 rounded-[20px] bg-[rgba(255,255,255,0.56)] p-6 relative left-80">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <form
            id="opinionRequestForm"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="request Title"
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
                name="title"
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
                className="block mt-5"
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
                name="description"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                placeholder="Provide a detailed description of your request, including any specific requirements or context..."
                required
                rows="4"
                className="mt-1 block w-[500px] h-[150px] rounded-[4px] bg-[rgba(191,186,174,0.72)] p-2 placeholder-[#695D3C]"
              />
            </div>
            <PriorityLevelSelector
              priorityLevel={priorityLevel}
              setPriorityLevel={setPriorityLevel}
            />
            <div className="flex flex-row">
              <div
                className="mt-5 w-[300px] h-[100px] flex-shrink-0 rounded-[4px] me-3 bg-[rgba(191,186,174,0.72)] flex flex-col items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("fileUpload").click()}
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
                  name="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  multiple
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

              <div className="mt-3 overflow-y-auto max-h-[120px] flex">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-200 p-2 rounded mt-2 mr-2 w-[calc(70%)]"
                  >
                    <span title={file.name}>
                      {file.name.length > 15
                        ? `${file.name.substring(0, 15)}...`
                        : file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block mt-5"
                style={{
                  color: "#695D3C",
                  fontSize: "20px",
                  fontWeight: 400,
                }}
              >
                Due Date{" "}
              </label>
              <input
                type="date"
                id="dueDate"
                name="deadline"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
                className="block w-[250px] h-[40px] rounded-[4px] bg-[rgba(191,186,174,0.72)] p-2"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-10 w-full py-2 bg-gold-900 text-white rounded-lg hover:bg-gold-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {showAlert && (
          <Alert
            message={responseMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RequestInternalOpinion;
