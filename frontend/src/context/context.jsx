import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "../utils/firebase-config";

import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [sub , setSub] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const value = {isSubscribed, sub, subUser, user, signUp, logIn, logOut ,emailExists};

  async function subUser(subscriptionData) {
    try {
      const docRef = doc(db, "subuser", subscriptionData.email); 
      await setDoc(docRef, subscriptionData);
      setSub(true); 
    } catch (error) {
      console.error("Error creating Firestore document:", error);
    }
  }

async function emailExists (email) {
  try {
    const userCredential = await fetchSignInMethodsForEmail(auth, email);
    return !!userCredential;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    return false;
  }
};

  async function signUp(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", email), {
        savedMovies: [],
      });
    } catch (error) {
      console.error("Error creating Firestore document:", error);
    }
  }


  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

 useEffect(() => {
   if (user?.email) {
     const userDocRef = doc(db, "subuser", user.email);
     getDoc(userDocRef)
       .then((docSnapshot) => {
         if (docSnapshot.exists()) {
           const subscriptionData = docSnapshot.data();
           const subscriptionStatus = subscriptionData.subscriptionStatus;
           setIsSubscribed(subscriptionStatus === "subscribed");
         }
       })
       .catch((error) => {
         console.error("Error fetching subscription data:", error);
       });
   }
 }, [user]);


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