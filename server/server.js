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


// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
