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
})