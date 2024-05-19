const express = require('express');
const mongoose = require('mongoose');
const Note = require("./models/NoteSchema");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = 4000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('Connected to MongoDB Annisa');
});

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

// Get a note by ID
app.get("/note/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const note = await Note.findOne({ _id });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note found", data: note });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a note by ID
app.put("/updateNote/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const { title, body } = req.body;

        const existingNote = await Note.findOne({ _id });

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
app.delete("/deleteNote/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const deletedNote = await Note.findOne({ _id });
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note successfully deleted", data: deletedNote });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));