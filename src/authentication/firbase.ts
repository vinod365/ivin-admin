"use client";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const getFireBaseConfig = (
  firebaseConfig: FirebaseConfigType,
) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  //Google Provider
  const provider = new GoogleAuthProvider();
  return { auth, provider };
};

export type FirebaseConfigType = {
    apiKey: string;
    authDomain: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    measurementId?: string;
  };
  