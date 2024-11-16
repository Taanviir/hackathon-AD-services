import React from "react";

function DepartmentSelect({ department, setDepartment }) {
  // Define a list of departments
  const departments = [
    "Human Resources",
    "Engineering",
    "Marketing",
    "Sales",
    "Finance",
    "Customer Support",
    "IT",
    "Product",
    "Legal",
  ];

  return (
    <div className="mb-4">
      <label htmlFor="department" className="block mb-2 text-lg font-medium">
        Department
      </label>
      <select
        id="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gold-200 focus:border-gold-300"
        required
      >
        <option value="" disabled>Select a department</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentSelect;