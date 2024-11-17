import React, { useState } from "react";

function App() {
    const [document, setDocument] = useState("");
    const [summary, setSummary] = useState("");
    const [researchPrompt, setResearchPrompt] = useState("");
    const [researchSummary, setResearchSummary] = useState("");

    const handleDocumentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/opinion_request/", {
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

    const handleResearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/research/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: researchPrompt }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setResearchSummary(data.insight);
        } catch (error) {
            console.error("Error processing research prompt:", error);
        }
    };

    return (
        <div className="App">
            {/* Research Prompt Section */}
            <div className="research-prompt mt-4">
                <h2>Research Topic</h2>
                <form onSubmit={handleResearchSubmit}>
                    <textarea
                        value={researchPrompt}
                        onChange={(e) => setResearchPrompt(e.target.value)}
                        placeholder="Enter a topic to research"
                        rows="3"
                        className="border p-2 w-full"
                    ></textarea>
                    <button type="submit" className="bg-green-500 text-white p-2 mt-2">
                        Get Research Insights
                    </button>
                </form>
                {researchSummary && (
                    <div className="mt-4">
                        <h3>Research Summary:</h3>
                        <p>{researchSummary}</p>
                    </div>
                )}
            </div>

            {/* Document Summary Section */}
            <div className="document-summary mt-4">
                <h2>Document Summarizer</h2>
                <form onSubmit={handleDocumentSubmit}>
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
        </div>
    );
}

export default App;
