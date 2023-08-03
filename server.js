const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
    readFromFile,
    readAndAppend,
    writeToFile
} = require("./helpers/fsUtils");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// Get all notes from db
app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json")
    .then((data) => res.json(JSON.parse(data)));
});

// Post new note to db
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully!");
    } else res.error("Error adding note");
});

// Delete a specific note by id from the db
app.delete("/api/notes/:id", (req, res) => {
    readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Saves a new array that excludes the target note to the db
        const result = json.filter((note) => note.id !== req.params.id);
        writeToFile("./db/db.json", result);

        res.json("Note deleted.");
    });
});