import React from 'react';

const PriorityLevelSelector = ({ priorityLevel, setPriorityLevel }) => {
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
                        name="priority"
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
                                borderColor: '#81807a', // Gray border
                                backgroundColor: priorityLevel === 'high' ? '#857c65' : 'transparent', // Dark gold for checked
                            }}
                        ></span>
                        High
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="medium"
                        name="priority"
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
                                borderColor: '#81807a', // Gray border
                                backgroundColor: priorityLevel === 'medium' ? '#857c65' : 'transparent', // Dark gold for checked
                            }}
                        ></span>
                        Medium
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="low"
                        name="priority"
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
                                borderColor: '#81807a', // Gray border
                                backgroundColor: priorityLevel === 'low' ? '#857c65' : 'transparent', // Dark gold for checked
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
