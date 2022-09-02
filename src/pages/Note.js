import { useParams, Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import React, { useState, useEffect } from "react";

const SingleNote = () => {
  const noteId = useParams().noteId;
  let [note, setNote] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId !== "new") {
      let response = await fetch(`http://localhost:5000/notes/${noteId}`);
      let data = await response.json();
      setNote(data);
    }
  };

  let updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    navigate(`/`, { state: note });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate(`/`, { state: note });
  };

  let addNote = async () => {
    await fetch(`http://localhost:5000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        body: note.body,
        updated: new Date(),
        created: new Date(),
      }),
    });
    navigate(`/`, { state: note });
  };

  let handleSubmission = () => {
    if (noteId === "new" && note !== null && note.body !== "") {
      addNote();
    } else if (note.body !== "") {
      updateNote();
    } else {
      deleteNote();
    }
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link onClick={handleSubmission} to={`/`}>
            <ArrowLeft />
          </Link>
        </h3>
        <button onClick={deleteNote}>Delete</button>
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default SingleNote;
