import React from "react";

function PositionSelect({ position, setPosition }) {
  // Define the two position options
  const positions = [
    { label: "Employee", value: "employee" },
    { label: "Manager", value: "manager" },
  ];

  return (
    <div className="mb-4">
      <label htmlFor="position" className="block mb-2 ms-2 text-lg font-medium">
        Position
      </label>
      <select
        id="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
        required
      >
        <option value="" disabled>Select a position</option>
        {positions.map((pos) => (
          <option key={pos.value} value={pos.value}>
            {pos.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PositionSelect;