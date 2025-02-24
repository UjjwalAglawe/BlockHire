// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "blockhire-5b10d.firebaseapp.com",
  projectId: "blockhire-5b10d",
  storageBucket: "blockhire-5b10d.appspot.com",
  messagingSenderId: "580171225142",
  appId: "1:580171225142:web:6eb610289be4a7c661e097"
};

const app = initializeApp(firebaseConfig);

export { app };