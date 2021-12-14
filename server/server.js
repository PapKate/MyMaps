require("dotenv").config();

// Get the url module
var urlModule = require('url');

// Get the cors module
const cors = require('cors');

const express = require('express');

const app = express();

// Use cors module
app.use(cors());


// Middleware
// Allows us to send JSON data through the body of a request
app.use(express.json({ limit: '1gb' }));


// Routes
app.use("/api", require("./routes/MyMapsRoutes"));


const PORT= process.env.PORT || 3001;

app.listen(PORT, () => console.log(`✨ Server running on port ${PORT} ✨`));