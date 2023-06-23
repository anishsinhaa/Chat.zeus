import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYIeMN3k9wHtHdYUdD6sTogW6tSA1BuVs",
  authDomain: "chat-zeus-c42b1.firebaseapp.com",
  projectId: "chat-zeus-c42b1",
  storageBucket: "chat-zeus-c42b1.appspot.com",
  messagingSenderId: "533405793251",
  appId: "1:533405793251:web:5034be329de1e471877ed6",
  measurementId: "G-NC4BST7B6X"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)