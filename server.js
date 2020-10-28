// Dependencies
const express = require("express")
const fs = require("fs")
const path = require("path")

// Sets up Express app
const app = express()
const PORT = (process.env.PORT || 3000)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// The following code serves static files in a directory named public:
app.use(express.static('public')) 

// Converts text in the db.json in to Javascript objects
let dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.get("/api/notes/:id", function(req, res) {
    
    res.json(dbNotes[req.params.id])
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});
// Saves notes to db.json
app.post("/api/notes", function(req, res) {
    let newNote = req.body
    let uniqueID = (dbNotes.length).toString()
    newNote.id = uniqueID
    dbNotes.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes))
    res.json(dbNotes)
});
// Deletes notes in db.json
app.delete("/api/notes/:id", function(req, res) {
    let noteID = req.params.id
    let newID = 0
    dbNotes = dbNotes.filter(function(currNote){
        return currNote.id != noteID
    })
    
    for (currNote of dbNotes) {
        currNote.id = newID.toString()
        newID++
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes))
    res.json(dbNotes)
});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
});