import React, { useState } from 'react';
import './EducationalDetail.css';
import { useNavigate } from 'react-router-dom';

const EducationalDetails = () => {
    const navigate = useNavigate();
    const [educationData, setEducationData] = useState([
        {
            stage: "",
            result: "",
            clearedMonth: "",
            clearedYear: "",
            subjectsFailed: "",
        },
    ]);

    const handleChange = (index, field, value) => {
        const updatedData = educationData.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        );
        setEducationData(updatedData);
    };

    const handleAddDetail = () => {
        // Check if all fields in the last entry are filled
        const lastEntry = educationData[educationData.length - 1];
        if (!lastEntry.stage || !lastEntry.result || !lastEntry.clearedMonth || !lastEntry.clearedYear) {
            alert("Please fill all fields before adding a new detail.");
            return;
        }

        // Add a new empty entry
        setEducationData([
            ...educationData,
            { stage: "", result: "", clearedMonth: "", clearedYear: "", subjectsFailed: "" },
        ]);
    };

    const handleSubmit = () => {
        // Validate all entries
        for (let i = 0; i < educationData.length; i++) {
            const entry = educationData[i];
            if (!entry.stage || !entry.result || !entry.clearedMonth || !entry.clearedYear) {
                alert(`Please fill all fields for entry ${i + 1}`);
                return;
            }
        }

        const personalDetails = JSON.parse(localStorage.getItem('personalDetails')) || {};
        const formData = { ...personalDetails, educationData };
        console.log('Form Data:', formData); // Replace with an API call
        alert('Form submitted successfully!');
        localStorage.setItem('educationDetails', JSON.stringify(educationData));
    };

    const handleBack = () => {
        localStorage.setItem('educationDetails', JSON.stringify(educationData));
        navigate('/');
    };

    return (
        <div className="form-container">
            <h1>Educational Details Form</h1>

            <form className="educational-details-form">
                {educationData.map((entry, index) => (
                    <div className="form-group" key={index}>
                        <h4>Educational Detail {index + 1}</h4>
                        <label>Stage:</label>
                        <input
                            type="text"
                            placeholder="e.g., 10th Std"
                            value={entry.stage}
                            onChange={(e) => handleChange(index, "stage", e.target.value)}
                        />
                        <div className="form-row">
                            <div className="form-field">
                                <label>Result:</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Passed"
                                        value={entry.result}
                                        onChange={(e) => handleChange(index, "result", e.target.value)}
                                    />
                            </div>
                            <div className="form-field">
                                <label>Cleared in Month:</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., January"
                                        value={entry.clearedMonth}
                                        onChange={(e) => handleChange(index, "clearedMonth", e.target.value)}
                                    />
                                </div>
                                <div className="form-field">
                                <label>Cleared in Year:</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 2024"
                                        value={entry.clearedYear}
                                        onChange={(e) => handleChange(index, "clearedYear", e.target.value)}
                                    />
                                </div>
                            </div>
                        <label>Subjects Failed:</label>
                        <input
                            type="text"
                            placeholder="e.g., None"
                            value={entry.subjectsFailed}
                            onChange={(e) => handleChange(index, "subjectsFailed", e.target.value)}
                        />
                    </div>
                ))}

                <div className="button-group">
                    <button type="button" className="add-btn" onClick={handleAddDetail}>
                        Add Details
                    </button>
                </div>
            </form>

            <div className="button-group">
                <button type="button" onClick={handleBack} className="back-btn">
                    Back
                </button>
                <button type="button" onClick={handleSubmit} className="submit-btn">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EducationalDetails;

