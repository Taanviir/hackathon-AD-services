import React, { useState } from 'react';

const OpinionForm = () => {
    const [opinion, setOpinion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Submitted opinion:', opinion);
    };

    return (
        <div>
            <h1>Opinion Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="opinion">Your Opinion:</label>
                    <textarea
                        id="opinion"
                        value={opinion}
                        onChange={(e) => setOpinion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OpinionForm;