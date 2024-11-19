import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const OpinionBox = ({ id, title, dueDate, priorityLevel }) => {
  const navigate = useNavigate();

  const handleOpenForm = () => {
    navigate("/opinion-form", { state: { id } });
  };

  return (
    <div className="flex flex-col rounded-lg bg-[rgba(255,255,255,0.6)] shadow-lg min-w-[250px] max-w-[250px] p-6 my-6 border border-gold-800 opinion-box">
      {/* Description Section */}
      <div className="pb-4 text-center text-gold-900 border-b border-gold-800 min-h-[36%]">
        <p className="text-lg uppercase font-semibold text-gold-800">Title</p>
        <p className="mt-2 text-gold-800">{title}</p>
      </div>

      {/* Due Date Section */}
      <div className="pb-4 text-center text-gold-800 border-b border-gold-800">
        <p className="mt-2 text-sm uppercase font-semibold text-gold-800">Due Date</p>
        <p className="text-gold-800">{formatDate(dueDate)}</p>
      </div>

      <div className="pb-4 text-center text-gold-800 border-b border-gold-800">
        <p className="mt-2 text-sm uppercase font-semibold text-gold-800">Priority Level</p>
        <p className="text-gold-800">{priorityLevel}</p>
      </div>

      <div className="p-0">
        <button
          onClick={handleOpenForm}
          className="mt-4 mb-5 w-full rounded-md bg-gold-800 py-2 px-4 text-center text-sm text-white transition-all shadow-md hover:bg-gold-500 focus:bg-gold-800"
        >
          Open Form
        </button>
      </div>
    </div>
  );
};

export default OpinionBox;