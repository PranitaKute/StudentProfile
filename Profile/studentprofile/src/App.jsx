import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './Components/Data';
import EducationalDetail from './Components/EducationalDetail'; // Update path if needed
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <img src="/resources/viitlogopng.png" alt="collage logo" />

                </header>
                <main>
                    <Routes>
                        {/* Route for Personal Details */}
                        <Route path="/" element={<Data />} />

                        {/* Route for Educational Details */}
                        <Route path="/educational-detail" element={<EducationalDetail />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>&copy; 2024 Student Profile Management</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
