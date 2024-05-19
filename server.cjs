const express = require('express');
const mongoose = require('mongoose');
const Note = require("./models/NoteSchema.cjs");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Annisa'))
    .catch(err => console.log(err));


// Create a note
app.post("/addNote", async (req, res) => {
    const { title, body } = req.body;
    const note = new Note({ title, body });
    try {
        await note.save();
        res.status(201).json({ message: "Note successfully added", data: note });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ message: "Notes retrieved successfully", data: notes });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a note by ID
app.get("/note/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const note = await Note.findOne({ id });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note found", data: note });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a note by ID
app.put("/updateNote/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { title, body } = req.body;

        const existingNote = await Note.findOne({ id });

        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        existingNote.title = title;
        existingNote.body = body;

        const updatedNote = await existingNote.save();

        res.status(200).json({ message: "Note successfully updated", data: updatedNote });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a note by ID
app.delete("/deleteNote/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedNote = await Note.findOneAndDelete({ id });
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note successfully deleted", data: deletedNote });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));