import React, { useState } from "react";

function App() {
    const [document, setDocument] = useState("");
    const [summary, setSummary] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/process_document/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ document: document }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setSummary(data.summary);
        } catch (error) {
            console.error("Error processing document:", error);
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder="Enter document text"
                    rows="10"
                    className="border p-2 w-full"
                ></textarea>
                <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
                    Summarize
                </button>
            </form>
            {summary && <p className="mt-4">Summary: {summary}</p>}
        </div>
    );
}

export default App;
