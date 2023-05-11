import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBPivIWP9hN7I-arhzQeyLlUuOdtTbi9z8",
  authDomain: "hrms-itp-sliit-y2s2-2023-feb.firebaseapp.com",
  projectId: "hrms-itp-sliit-y2s2-2023-feb",
  storageBucket: "hrms-itp-sliit-y2s2-2023-feb.appspot.com",
  messagingSenderId: "912142062899",
  appId: "1:912142062899:web:320df2bec66f7fab719a46",
  measurementId: "G-GNDRJ9BNK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);