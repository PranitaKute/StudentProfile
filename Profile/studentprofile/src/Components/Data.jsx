import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Data.css';

const Data = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        contactNo: '',
        admissionYear: '',
        admittedTo: '',
        rollNo: '',
        division: '',
        prn: '',
        department: '',
        addressType: ' ',
        localAddress: ' ',
        localAddressOwnerName: ' ',
        localAddressOwnerPhone: ' ',
        localGuardianName: ' ',
        localGuardianPhone: ' ',
        hostelAddress: ' ',
        hostelAddressOwnerName: ' ',
        hostelAddressOwnerPhone: ' ',
        parentType: '',
        motherName: '',
        motherOccupation: '',
        motherContact: '',
        motherEmail: '',
        motherEducation: '',
        fatherName: '',
        fatherOccupation: '',
        fatherContact: '',
        fatherEmail: '',
        fatherEducation: '',
        siblingsCount: '',
        siblings: [],
        hobbies: '',
        schoolMedium: 'English',
        yearOfStudy: '',
    });

    const [age, setAge] = useState('');

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('personalDetails'));
        if (savedData) {
            setFormData(savedData);
            if (savedData.dob) {
                calculateAge(savedData.dob);
            }
        }
    }, []);

    const calculateAge = (dob) => {
        if (!dob) return;
        const birthDate = new Date(dob);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        setAge(calculatedAge);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'dob') {
            calculateAge(value);
        }
    };
    const handleNext = (e) => {
        e.preventDefault(); // Prevent form submission
        const requiredFields = ['name', 'dob', 'contactNo', 'admissionYear', 'prn', 'addressType'];

        // Add required fields based on address type
        if (formData.addressType === 'Local') {
            requiredFields.push('localAddress', 'localAddressOwnerName', 'localAddressOwnerPhone', 'localGuardianName', 'localGuardianPhone');
        } else if (formData.addressType === 'Hostel') {
            requiredFields.push('hostelAddress', 'hostelAddressOwnerName', 'hostelAddressOwnerPhone');
        }

        // Add required fields based on selected parent type
        if (formData.parentType === 'Mother') {
            requiredFields.push('motherName', 'motherContact');
        } else if (formData.parentType === 'Father') {
            requiredFields.push('fatherName', 'fatherContact');
        }

        const missingFields = requiredFields.filter((field) => !formData[field]);
        if (missingFields.length > 0) {
            alert(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        // Save to localStorage and navigate
        try {
            localStorage.setItem('personalDetails', JSON.stringify(formData));
            navigate('/educational-detail');
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    };

    const handleSiblingsCountChange = (e) => {
        const count = parseInt(e.target.value, 10) || 0;
        const siblings = Array.from({ length: count }, (_, index) => ({
            name: '',
            age: '',
            education: '',
        }));
        setFormData({ ...formData, siblingsCount: count, siblings });
    };

    const handleSiblingChange = (index, e) => {
        const updatedSiblings = [...formData.siblings];
        updatedSiblings[index] = { ...updatedSiblings[index], [e.target.name]: e.target.value };
        setFormData({ ...formData, siblings: updatedSiblings });
    };

    return (
        <div className="form-container">
            <h1>Personal Details Form</h1>
            <form className="personal-details-form">
                <div class="row">
                    <div className="field name">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>


                </div>

                <div class="row">



                    <div className="dob-age-container">
                        {/* DOB Field */}
                        <div className="field dob">
                            <label>DOB:</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        
                    </div>
                    <div className="field age">
                            <label>Age:</label>
                            <span>{age ? `${age} years` : ' '}</span>
                        </div>





                    <div className="data-page">
                        {<div className="field contact">
                            <label>Contact No.:</label>
                            <div className="contact-container">
                                <div className="country-code">
                                    <input
                                        type="text"
                                        value="+91"
                                        readOnly
                                    />
                                </div>
                                <div className="contact-number">
                                    <input
                                        type="number"
                                        name="contactNo"
                                        placeholder="Enter phone number"
                                        value={formData.contactNo}
                                        onChange={handleChange}
                                        maxLength="10" // Restrict to 10 digits
                                        pattern="\d{10}"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        }
                    </div>

                </div>
                <div class="row">

                    <div className="field admission-year">
                        <label>Admission Year:</label>
                        <input type="number" name="admissionYear" value={formData.admissionYear} onChange={handleChange} required />
                    </div>
                    <div className="field admitted-to">
                        <label>Admitted to:</label>
                        <select name="admittedTo" value={formData.admittedTo} onChange={handleChange}>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                        </select>
                    </div>


                    <div className="field prn">
                        <label>PRN:</label>
                        <input type="number" name="prn" value={formData.prn} onChange={handleChange} required />
                    </div>
                    <div className="field department">
                        <label>Department:</label>
                        <select name="department" value={formData.department} onChange={handleChange}>
                            <option value="">Select Department</option>
                            <option value="Civil">Civil</option>
                            <option value="I.T.">I.T.</option>
                            <option value="Computer">Computer</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="E&TC">E&TC</option>
                            <option value="E&AS">E&AS</option>
                        </select>
                    </div>
                </div>

                <div class="row">

                    <div className="field year-of-study">
                        <label>Year of Study:</label>
                        <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange}>
                            <option value="">Select Year</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                        </select>
                    </div>

                    {/* Conditionally render roll number and division based on selected year */}
                    {formData.yearOfStudy && (
                        <div className="form-group">
                            <label>Roll Number:</label>
                            <input
                                type="number"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    {formData.yearOfStudy && (
                        <div className="form-group">
                            <label>Division:</label>
                            <input
                                type="text"
                                name="division"
                                value={formData.division}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                </div>

                <div class="row">
                    <div className="parent-details">
                        <label>Siblings Count:</label>
                        <input type="number" name="siblingsCount" value={formData.siblingsCount} onChange={handleSiblingsCountChange} />
                    </div>
                </div>

                {formData.siblingsCount > 0 && (
                    <>
                        <h3>Siblings Details</h3>
                        {formData.siblings.map((sibling, index) => (
                            <div key={index} className="sibling-form">
                                <div className="form-group">
                                    <label>Sibling {index + 1} Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={sibling.name}
                                        onChange={(e) => handleSiblingChange(index, e)}
                                        required
                                    />
                                </div>
                                <div class="row">
                                    <div className="form-group">
                                        <label>Age:</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={sibling.age}
                                            onChange={(e) => handleSiblingChange(index, e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Education:</label>
                                        <input
                                            type="text"
                                            name="education"
                                            value={sibling.education}
                                            onChange={(e) => handleSiblingChange(index, e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}


                <div className="form-group">
                    <label>Address Type:</label>
                    <select name="addressType" value={formData.addressType} onChange={handleChange} required>
                        <option value="">Select Address Type</option>
                        <option value="Local">Local Address</option>
                        <option value="Hostel">Hostel Address</option>
                    </select>
                </div>

                {formData.addressType === 'Local' && (
                    <>
                        <div className="form-group">
                            <label>Local Address:</label>
                            <textarea name="localAddress" value={formData.localAddress} onChange={handleChange} required />
                        </div>
                        <div class="row">

                            <div className="form-group">
                                <label>Local Address Owner Name:</label>
                                <input type="text" name="localAddressOwnerName" value={formData.localAddressOwnerName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Local Address Owner Phone:</label>
                                <div className="data-page">
                                    {<div className="field contact">
                                        <div className="contact-container">
                                            <div className="country-code">
                                                <input
                                                    type="text"
                                                    value="+91"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="contact-number">
                                                <input
                                                    type="text"
                                                    name="localAddressOwnerPhone"
                                                    placeholder="Enter phone number"
                                                    value={formData.localAddressOwnerPhone}
                                                    onChange={handleChange}
                                                    maxLength="10" // Restrict to 10 digits
                                                    pattern="\d{10}"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div className="form-group">
                                <label>Local Guardian Name:</label>
                                <input type="text" name="localGuardianName" value={formData.localGuardianName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Local Guardian Phone:</label>
                                <div className="data-page">
                                    {<div className="field contact">
                                        <div className="contact-container">
                                            <div className="country-code">
                                                <input
                                                    type="text"
                                                    value="+91"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="contact-number">
                                                <input
                                                    type="text"
                                                    name="localGuardianPhone"
                                                    placeholder="Enter phone number"
                                                    value={formData.localGuardianPhone}
                                                    onChange={handleChange}
                                                    maxLength="10" // Restrict to 10 digits
                                                    pattern="\d{10}"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {formData.addressType === 'Hostel' && (
                    <>
                        <div className="form-group">
                            <label>Hostel Address:</label>
                            <textarea name="hostelAddress" value={formData.hostelAddress} onChange={handleChange} required />
                        </div>
                        <div class="row">
                            <div className="form-group">
                                <label>Hostel Address Owner Name:</label>
                                <input type="text" name="hostelAddressOwnerName" value={formData.hostelAddressOwnerName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Hostel Address Owner Phone:</label>
                                <div className="data-page">
                                    {<div className="field contact">
                                        <div className="contact-container">
                                            <div className="country-code">
                                                <input
                                                    type="text"
                                                    value="+91"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="contact-number">
                                                <input
                                                    type="text"
                                                    name="hostelAddressOwnerPhone"
                                                    placeholder="Enter phone number"
                                                    value={formData.hostelAddressOwnerPhone}
                                                    onChange={handleChange}
                                                    maxLength="10" // Restrict to 10 digits
                                                    pattern="\d{10}"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="form-group parent-selection">
                    <label>Select Parent:</label>
                    <div className="radio-group">
                        <div className="radio-option">
                            <input
                                type="radio"
                                id="mother"
                                name="parentType"
                                value="Mother"
                                checked={formData.parentType === 'Mother'}
                                onChange={handleChange}
                            />
                            <label htmlFor="mother">Mother</label>
                        </div>
                        <div className="radio-option">
                            <input
                                type="radio"
                                id="father"
                                name="parentType"
                                value="Father"
                                checked={formData.parentType === 'Father'}
                                onChange={handleChange}
                            />
                            <label htmlFor="father">Father</label>
                        </div>
                    </div>
                </div>

                {formData.parentType === 'Mother' && (
                    <fieldset className="parent-details">
                        <legend>Mother's Details</legend>
                        <div className="form-group">
                            <label>Name & Occupation:</label>
                            <div class="row">
                                <input type="text" name="motherName" placeholder="Name" value={formData.motherName} onChange={handleChange} required />
                                <input type="text" name="motherOccupation" placeholder="Occupation" value={formData.motherOccupation} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Contact No. / Email:</label>
                            <div class="row">
                                <div className="data-page">
                                    {<div className="field contact">
                                        <div className="contact-container">
                                            <div className="country-code">
                                                <input
                                                    type="text"
                                                    value="+91"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="contact-number">
                                                <input
                                                    type="text"
                                                    name="motherContact"
                                                    placeholder="Enter phone number"
                                                    value={formData.motherContact}
                                                    onChange={handleChange}
                                                    maxLength="10" // Restrict to 10 digits
                                                    pattern="\d{10}"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <input type="email" name="motherEmail" placeholder="Email" value={formData.motherEmail} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Education:</label>
                            <input type="text" name="motherEducation" value={formData.motherEducation} onChange={handleChange} />
                        </div>
                    </fieldset>
                )}

                {formData.parentType === 'Father' && (
                    <fieldset className="parent-details">
                        <legend>Father's Details</legend>
                        <div className="form-group">
                            <label>Name & Occupation:</label>
                            <div class="row">
                                <input type="text" name="fatherName" placeholder="Name" value={formData.fatherName} onChange={handleChange} required />
                                <input type="text" name="fatherOccupation" placeholder="Occupation" value={formData.fatherOccupation} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Contact No. / Email:</label>
                            <div class="row">
                                <div className="data-page">
                                    {<div className="field contact">
                                        <div className="contact-container">
                                            <div className="country-code">
                                                <input
                                                    type="text"
                                                    value="+91"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="contact-number">
                                                <input
                                                    type="text"
                                                    name="fatherContact"
                                                    placeholder="Enter phone number"
                                                    value={formData.fatherContact}
                                                    onChange={handleChange}
                                                    maxLength="10" // Restrict to 10 digits
                                                    pattern="\d{10}"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <input type="email" name="fatherEmail" placeholder="Email" value={formData.fatherEmail} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Education:</label>
                            <input type="text" name="fatherEducation" value={formData.fatherEducation} onChange={handleChange} />
                        </div>
                    </fieldset>
                )}





                <div className="form-group">
                    <label>Hobbies:</label>
                    <textarea name="hobbies" value={formData.hobbies} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <button type="button" className="next-button" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Data;