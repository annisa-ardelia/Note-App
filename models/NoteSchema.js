const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    body: {
        type: String,
        required: [true, 'Body is required']
    },
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;