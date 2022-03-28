// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkt2a6ebGOq_Nv2CROT6xDrxFZ2Sn7-Xo",
  authDomain: "scribe-ddea6.firebaseapp.com",
  projectId: "scribe-ddea6",
  storageBucket: "scribe-ddea6.appspot.com",
  messagingSenderId: "754131858673",
  appId: "1:754131858673:web:ab08fd3c15642fc9186550",
  measurementId: "G-36HQZ6VG30"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;