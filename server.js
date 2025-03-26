const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config(); // Load environment variables from .env file
const router = require('./router'); // Ensure this points to the correct router file

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to test server connection
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Route to test MongoDB connection
app.get('/', (req, res) => {
    try {
        res.status(201).send({ msg: "Connected to MongoDB" });
    } catch (err) {
        res.status(500).send({ msg: "Something went wrong", err });
    }
});

app.use('', router);

const PORT = 9080;
app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Server connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
});