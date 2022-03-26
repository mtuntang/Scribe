import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import firebase from "firebase/compat/app";
import db from "./firebase";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    db.collection('notes').onSnapshot(snapshot => {
      setNotes(snapshot.docs.map(doc => ({id: doc.id, title: doc.data().title, content: doc.data().content})))
    })
  }, []);

  function addNote(newNote) {
    db.collection('notes').add({
      title: newNote.title,
      content: newNote.content,
    })

    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    db.collection('notes').doc(id).delete();

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
