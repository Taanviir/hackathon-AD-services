import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const InternalOpinionRequestForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requestType, setRequestType] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8000/api/opinion_request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    target_department: requestType,
                    priority: priorityLevel,
                    deadline: dueDate,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'An error occurred');
            }

            setSuccess('Request submitted successfully!');
        } catch (err) {
            setError('Submission failed: ' + err.message);
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Submit Internal Opinion Request</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="title">Request Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a concise title for the request"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="description">Request Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="requestType">Request Type:</label>
                    <select
                        id="requestType"
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">Select request type</option>
                        <option value="legal">Legal</option>
                        <option value="compliance">Compliance</option>
                        <option value="financial">Financial Analysis</option>
                        <option value="strategic">Strategic Input</option>
                        <option value="market">Market Analysis</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label>Priority Level:</label>
                    <div style={styles.radioGroup}>
                        {['High', 'Medium', 'Low'].map((level) => (
                            <div key={level} style={styles.radioOption}>
                                <input
                                    type="radio"
                                    id={level.toLowerCase()}
                                    name="priorityLevel"
                                    value={level.toLowerCase()}
                                    checked={priorityLevel === level.toLowerCase()}
                                    onChange={(e) => setPriorityLevel(e.target.value)}
                                    required
                                />
                                <label htmlFor={level.toLowerCase()}>{level}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="dueDate">Due Date:</label>
                    <div style={styles.dateContainer}>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <Calendar style={styles.calendarIcon} />
                    </div>
                </div>

                <button type="submit" style={styles.button}>Submit Request</button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
    },
    title: {
        marginBottom: '24px',
        color: '#333',
        fontSize: '24px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        minHeight: '150px',
        width: '100%',
        resize: 'vertical',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        backgroundColor: 'white',
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    radioOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    dateContainer: {
        position: 'relative',
        width: '100%',
    },
    calendarIcon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666',
        pointerEvents: 'none',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#4b5563',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        ':hover': {
            backgroundColor: '#374151',
        },
    },
    error: {
        color: '#dc2626',
        marginTop: '10px',
        textAlign: 'center',
    },
    success: {
        color: '#16a34a',
        marginTop: '10px',
        textAlign: 'center',
    },
};

export default InternalOpinionRequestForm;