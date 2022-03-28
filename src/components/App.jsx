import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import firebase from "firebase/compat/app";
import db from "./firebase";
import Login from "./Login";
import { useStateValue } from "./StateProvider";


function App() {
  const [notes, setNotes] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [currentUser, setCurrentUser] = useState("notes");
  

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      setCurrentUser(firebase.auth().currentUser.uid.toString());
      // console.log("Login success with user: ", firebase.auth().currentUser.uid);
      // console.log(currentUser)
    }
    
  });
  
  useEffect(() => {
    firebase.auth().signOut();
    db.collection(currentUser).onSnapshot(snapshot => {
      setNotes(snapshot.docs.map(doc => ({id: doc.id, title: doc.data().title, content: doc.data().content})))
    })
  }, [currentUser]);


  function addNote(newNote) {
    db.collection(currentUser).add({
      title: newNote.title,
      content: newNote.content,
    })

    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    db.collection(currentUser).doc(id).delete();

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }


  return (
    <div>
      {!user ? (
          <Login/>
        ):(
          <>
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
          </>
          
          
        )}
    </div>
  );
}

export default App;
