import React, { useState, useEffect } from "react";
import { getNoteDetails } from "../actions/Note.actions"; 
import { useParams } from "react-router-dom";
import '../index.css';

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      const apiResponse = await getNoteDetails(id);
      if (apiResponse.success) {
        setNote(apiResponse.data);
      } else {
        console.error("Failed to fetch note details");
      }
    };

    fetchNoteDetails();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-notsoblack p-4 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-jade text-3xl font-bold mb-4"> {note.title}</h1>
      <p className="text-jade mb-2"> {note.body}</p>
    </div>
  );
};

export default NoteDetail;