const mongoose = require('mongoose');

// Helper function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const NoteSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        default: function() {
            return getRandomInt(1, 99999);
        }
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    body: {
        type: String,
        required: [true, 'Body is required']
    },
});

NoteSchema.pre('save', async function(next) {
    // Ensure the generated id is unique
    if (this.isNew) {
        let unique = false;
        while (!unique) {
            const existingNote = await Note.findOne({ id: this.id });
            if (existingNote) {
                this.id = getRandomInt(1, 99999);
            } else {
                unique = true;
            }
        }
    }
    next();
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;