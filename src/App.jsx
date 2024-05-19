import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNotesWithAxios } from "./actions/Note.actions";
import './index.css';

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

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="">
      <nav className="bg-jade p-4 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-notsoblack text-3xl font-bold">
            Simple Note
          </div>
        </div>
      </nav>
      <main className="bg-notsoblack w-full h-screen mx-auto p-16 pt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {notes.map((note) => (
            <Link to={`/note/${note.id}`} key={note.id}>
              <div className="bg-jade shadow-md rounded-lg overflow-hidden cursor-pointe">
                <div className="p-4">
                  <h2 className="text-notsoblack text-xl font-semibold mb-2">{note.title}</h2>
                  <p className="text-notsoblack">
                    {note.body.length > 200
                      ? `${note.body.substring(0, 200)}...`
                      : note.body}
                  </p>
                </div>
              </div>
          </Link>
        ))}
      </div>
      </main>
    </div>
  );
}

export default App;