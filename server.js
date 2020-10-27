//Dependencies
const express = require("express")
const fs = require("fs")
const path = require("path")

//Sets up Express app
const app = express()
const port = 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
// The following code serves static files in a directory named public:
app.use(express.static('public')) 

// Routes
// =============================================================
