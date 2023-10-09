import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "../utils/firebase-config";

import { signOut,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const value = { user, signUp, logIn, logOut };

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedMovies: [],
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
  return useContext(AuthContext);
}