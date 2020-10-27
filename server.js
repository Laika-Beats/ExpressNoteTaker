//Dependencies
const express = require("express")
const fs = require("fs")
const path = require("path")

//Sets up Express app
const app = express()
const PORT = 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// The following code serves static files in a directory named public:
app.use(express.static('public')) 

// Routes
const publicDir = path.join(__dirname, "/public")

app.get("/notes", function(req, res) {
    res.sendFile(path.join(publicDir, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[req.params.id]);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(publicDir, "index.html"));
});

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})

