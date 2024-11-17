import React from "react";

const OpinionBox = ({ description, dueDate, priorityLevel }) => {
  return (
    <div className="flex flex-col rounded-lg bg-[rgba(255,255,255,0.6)] shadow-lg max-w-[20%] p-6 my-6 border border-gold-800">
      
      {/* Description Section */}
      <div className="pb-4 text-center text-gold-900 border-b border-gold-800">
        <p className="text-sm uppercase font-semibold text-gold-800">Title</p>
        <p className="mt-2 text-gold-800">
          {description}
        </p>
      </div>

      {/* Due Date Section */}
      <div className="pb-4 text-center text-gold-800 border-b border-gold-800">
        <p className="mt-2 text-sm uppercase font-semibold text-gold-800">Due Date</p>
        <p className="text-gold-800">
          <strong>{dueDate}</strong>
        </p>
      </div>

      <div className="pb-4 text-center text-gold-800 border-b border-gold-800">
        <p className="mt-2 text-sm uppercase font-semibold text-gold-800">Priority Level</p>
        <p className="text-gold-800">
          <strong>{priorityLevel}</strong>
        </p>
      </div>

      {/* Open Form Section */}
      <div className="p-0">
        <form>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-gold-800 py-2 px-4 text-center text-sm text-white transition-all shadow-md hover:bg-gold-500 focus:bg-gold-800"
          >
            Open Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default OpinionBox;