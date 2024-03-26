require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch(err => {
      console.error("MongoDB connection error:", err);
    });

// Define Contact Model
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// API Routes
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/contacts', async (req, res) => {
    // Create new contact object with user input 
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        // Save the new contact object to the database
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
