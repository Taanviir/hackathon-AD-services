import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OpinionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const [opinion, setOpinion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    requestor: "",
    department: "",
    questions: [],
  });

  const [answers, setAnswers] = useState([]);

  const questionsPerPage = 2;

  useEffect(() => {
    const fetchOpinionData = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:8000/api/opinion_request/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const opinionRequest = data.opinion_request;
        const target_departments = data.target_departments;
        console.log(target_departments)

        setFormData({
          title: opinionRequest.title,
          description: opinionRequest.description,
          dueDate: opinionRequest.deadline,
          requestor: opinionRequest.requestor,
          department: target_departments[0].department_name,
          questions: target_departments[0].questions || [],
        });

        // Initialize answers as an empty array
        setAnswers(new Array(target_departments[0].questions.length).fill(""));
      } catch (error) {
        console.error("Error fetching opinion request:", error);
      }
    };

    fetchOpinionData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for submission
    const submissionData = {
        ...formData.questions,
      answers,
    };

    try {
    // Send data back to the backend
    const response = await fetch(`http://localhost:8000/api/opinion_request/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
      credentials: "include",
    });

    if (response.ok) {
        // If the submission is successful, navigate to the homepage
        navigate("/");  // Redirect to the homepage
      } else {
        // Handle error if the response is not OK
        console.error("Submission failed:", response);
      }
    } catch (error) {
        console.error("Error during submission:", error);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(formData.questions.length / questionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(formData.questions.length / questionsPerPage);

  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Internal Opinion Request Form
        </h1>

        <div className="w-[550px] h-[800px] mx-auto flex-shrink-0 rounded-[20px] bg-[rgba(255,255,255,0.56)] p-6 flex flex-col justify-between">
          <form
            id="opinionRequestForm"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Header/Body Section */}
            <div>
              <p className="text-xl font-bold">Title</p>
              <p>{formData.title}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Description</p>
              <p>{formData.description}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Due Date</p>
              <p>{new Date(formData.dueDate).toLocaleDateString('en-GB')}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Requestor</p>
              <p>{formData.requestor}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Department</p>
              <p>{formData.department}</p>
            </div>

            {/* Dynamic Questions */}
            {formData.questions
              .slice(
                (currentPage - 1) * questionsPerPage,
                currentPage * questionsPerPage
              )
              .map((questionText, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-gold-800">
                    {questionText}
                  </label>
                  <textarea
                    value={answers[(currentPage - 1) * questionsPerPage + index]}  // Adjust answer mapping based on the page
                    onChange={(e) => {
                      const updatedAnswers = [...answers];
                      updatedAnswers[(currentPage - 1) * questionsPerPage + index] = e.target.value;
                      setAnswers(updatedAnswers);  // Update the answer for the current question
                    }}
                    className="w-full h-32 p-2 border border-gold-800 rounded"
                  />
                </div>
              ))}
          </form>
          <div className="flex justify-between items-center mt-4 w-[100%]">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gold-800 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold me-5">
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-gold-800 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
        <button
            type="submit"
            form="opinionRequestForm"
            className="px-4 py-2 bg-gold-800 text-white rounded-md"
        >
            Submit
        </button>
        </div>
      </div>
    </div>
  );
};

export default OpinionForm;
