import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNotesWithAxios } from "./actions/Note.actions";
import { deleteNote } from "./actions/Note.actions";
import './index.css';

import addnote from './assets/add-note.svg';
import deletenote from './assets/trash.svg';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const apiResponse = await fetchNotesWithAxios();
    if (apiResponse.success) {
      setNotes(apiResponse.data);
    } else {
      alert("Failed to fetch notes");
    }
  };

  const deleteNoteDetails = async (id) => {
    const apiResponse = await deleteNote(id);
    if (apiResponse.success) {
      setNotes(notes.filter(note => note._id !== id)); // Remove deleted note from the state
    } else {
      console.error("Failed to delete note");
    }
    fetchNotes(); // Re-fetch notes after deleting
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (!notes.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <nav className="bg-jade p-4 pr-8 pl-8 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-notsoblack text-3xl font-bold">
            Simple Note
          </div>
          <Link to="/addNote">
            <img src={addnote} alt="Add Note" className="w-8 h-8" />
          </Link>
        </div>
      </nav>
      <main className="bg-notsoblack w-full h-full mx-auto p-8 pt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {notes.map((note) => (
              <div className="bg-jade shadow-md rounded-lg overflow-hidden cursor-pointe">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Link to={`/note/${note.id}`} key={note.id}>
                      <h2 className="text-notsoblack text-xl font-semibold mb-2">{note.title}</h2>
                    </Link>
                    <img
                      src={deletenote}
                      alt="Delete Note"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => deleteNoteDetails(note.id)}
                    />
                  </div>
                  <p className="text-notsoblack">
                    {note.body.length > 150
                      ? `${note.body.substring(0, 150)}...`
                      : note.body}
                  </p>
                </div>
              </div>
        ))}
      </div>
      </main>
    </div>
  );
}

export default App;