import React, { useState } from "react";
import axios from "axios";

function App() {
    const [document, setDocument] = useState("");
    const [summary, setSummary] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/process_document/", {
                document: document,
            });
            setSummary(response.data.summary);
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
