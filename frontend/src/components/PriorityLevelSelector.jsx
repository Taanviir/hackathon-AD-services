import React, { useState } from 'react';

const PriorityLevelSelector = () => {
    const [priorityLevel, setPriorityLevel] = useState('');

    return (
        <div>
            <h2
                style={{
                    color: "#695D3C",
                    fontSize: "20px",
                    fontWeight: 400,
                }}
            >
                Priority Level:
            </h2>
            <div className="flex space-x-4">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="high"
                        value="high"
                        checked={priorityLevel === "high"}
                        onChange={(e) => setPriorityLevel(e.target.value)}
                        className="hidden peer"
                    />
                    <label
                        htmlFor="high"
                        className="flex items-center cursor-pointer"
                    >
                        <span
                            className="w-4 h-4 border rounded-full mr-2 transition-colors duration-200"
                            style={{
                                borderColor: '#C0C0C0', // Gray border
                                backgroundColor: priorityLevel === 'high' ? '#BFBAAE' : 'transparent', // Dark gold for checked
                            }}
                        ></span>
                        High
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="medium"
                        value="medium"
                        checked={priorityLevel === "medium"}
                        onChange={(e) => setPriorityLevel(e.target.value)}
                        className="hidden peer"
                    />
                    <label
                        htmlFor="medium"
                        className="flex items-center cursor-pointer"
                    >
                        <span
                            className="w-4 h-4 border rounded-full mr-2 transition-colors duration-200"
                            style={{
                                borderColor: '#C0C0C0', // Gray border
                                backgroundColor: priorityLevel === 'medium' ? '#BFBAAE' : 'transparent', // Dark gold for checked
                            }}
                        ></span>
                        Medium
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="low"
                        value="low"
                        checked={priorityLevel === "low"}
                        onChange={(e) => setPriorityLevel(e.target.value)}
                        className="hidden peer"
                    />
                    <label
                        htmlFor="low"
                        className="flex items-center cursor-pointer"
                    >
                        <span
                            className="w-4 h-4 border rounded-full mr-2 transition-colors duration-200"
                            style={{
                                borderColor: '#C0C0C0', // Gray border
                                backgroundColor: priorityLevel === 'low' ? '#BFBAAE' : 'transparent', // Dark gold for checked
                            }}
                        ></span>
                        Low
                    </label>
                </div>
            </div>
        </div>
    );
};

export default PriorityLevelSelector;