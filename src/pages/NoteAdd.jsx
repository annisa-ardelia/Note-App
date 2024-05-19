import React, { useState } from "react";
import { addNote } from "../actions/Note.actions"; 
import { useHistory } from "react-router-dom";
import '../index.css';

const NoteAdd = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();

  const handleAddNote = async (event) => {
    event.preventDefault();
    const apiResponse = await addNote(title, body);
    if (apiResponse.success) {
      history.push("/"); // Redirect to home page after adding the note
    } else {
      console.error("Failed to add note");
    }
  };

  return (
    <div className="bg-notsoblack p-16 w-full h-screen flex flex-col items-center">
      <h1 className="text-jade text-4xl font-bold mb-4">Add a New Note</h1>
      <form onSubmit={handleAddNote} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-jade text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-notsoblack leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-jade text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-notsoblack leading-tight focus:outline-none focus:shadow-outline"
            rows="10"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-jade hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteAdd;