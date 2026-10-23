import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBKleNEB9pKjE4Y2UFxzOfVH9Qc6QG7Ago",
  authDomain: "adilj-85238.firebaseapp.com",
  projectId: "adilj-85238",
  storageBucket: "adilj-85238.firebasestorage.app",
  messagingSenderId: "402057623240",
  appId: "1:402057623240:web:46a92c10980485030c57fd",
  measurementId: "G-GX9KQLLFTS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);