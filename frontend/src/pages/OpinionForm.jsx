import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const OpinionForm = () => {
  const location = useLocation();
  const { id } = location.state || {};
  console.log("Opinion form id:", id);

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

  const questionsPerPage = 3;

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
        console.log("Opinion request data:", data);

        // Access the opinion_request object correctly
        const opinionRequest = data.opinion_request;

        setFormData({
          title: opinionRequest.title,
          description: opinionRequest.description,
          dueDate: opinionRequest.deadline, // Use 'deadline' instead of 'dueDate'
          requestor: opinionRequest.requestor, // This may be undefined in your data
          department: opinionRequest.department, // This may be undefined in your data
          questions: opinionRequest.questions || [], // Adjust according to your API response
        });
        console.log("formData:", formData);
      } catch (error) {
        console.error("Error fetching opinion request:", error);
      }
    };

    fetchOpinionData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data for submission
    const submissionData = {
      opinion,
      ...formData,
    };

    console.log("Submitted data:", JSON.stringify(submissionData));

    // Send data back to the backend
    // await fetch("/api/submit-opinion", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(submissionData),
    // });
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
              <p>{formData.dueDate}</p>
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
              .map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-gold-800">
                    {question.text}:
                  </label>
                  <textarea
                    value={question.answer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        questions: formData.questions.map((q, i) =>
                          i === index + (currentPage - 1) * questionsPerPage
                            ? { ...q, answer: e.target.value }
                            : q
                        ),
                      })
                    }
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
        {/* <button
          type="submit"
          form="opinionRequestForm"
          className="px-4 py-2 bg-gold-800 text-white rounded-md"
        >
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default OpinionForm;
