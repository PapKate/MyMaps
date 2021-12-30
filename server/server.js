require("dotenv").config();

// Get the url module
var urlModule = require('url');

// Get the cors module
const cors = require('cors');

const  bodyParser = require('body-parser');

const express = require('express');

const app = express();

// Use cors module
app.use(cors());

// Middleware
//app.use(express.json());

// Allows us to send JSON data through the body of a request
app.use(express.json({ limit: '1gb' }));
app.use(bodyParser.json());


// Routes
app.use("/api", require("./routes/MyMapsRoutes"));


const PORT= process.env.PORT || 3001;

app.listen(PORT, () => console.log(`✨ Server running on port ${PORT} ✨`));