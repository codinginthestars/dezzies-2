const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Log form data to the console (or save to a file)
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    // Save to a file (optional)
    const logMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;
    fs.appendFile('messages.txt', logMessage, (err) => {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).json({ message: 'Server error' });
        }
    });

    res.json({ message: 'Form submitted successfully!' });
});

// Server 
app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
});