// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXjJhNdQF6VvjdhA5nPuU7sOFiZ_DV9eU",
  authDomain: "netflix-clone-3c186.firebaseapp.com",
  projectId: "netflix-clone-3c186",
  storageBucket: "netflix-clone-3c186.appspot.com",
  messagingSenderId: "980942244074",
  appId: "1:980942244074:web:5e561d00bd0e1af9932f93",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)
