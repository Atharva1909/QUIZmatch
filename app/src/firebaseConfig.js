import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


// Firebase project configuration
const firebaseConfig = {
  
    apiKey: "AIzaSyBdEvlWwybU8SKP5kryqeqHyazgxgPyhS4",
    authDomain: "student-platform-18e07.firebaseapp.com",
    projectId: "student-platform-18e07",
    storageBucket: "student-platform-18e07.firebasestorage.app",
    messagingSenderId: "917397391778",
    appId: "1:917397391778:web:fe1006bacd985678d2cafb",
    measurementId: "G-5QHRYG1P4W"

};



const provider = new GoogleAuthProvider();


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, provider};