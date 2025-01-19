const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; 

app.use(cors()); 
app.use(bodyParser.json());

let studentProfiles = [];

app.post('/api/student-profile', (req, res) => {
    const formData = req.body;

    studentProfiles.push(formData);

    console.log('Received data:', formData);

    res.status(200).json({
        message: 'Form submitted successfully!',
        data: formData
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
