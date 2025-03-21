import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEE6qSM4FIjxN3q1bn8Y_HENEyVQvHUTk",
  authDomain: "sjpa-14841.firebaseapp.com",
  databaseURL: "https://sjpa-14841-default-rtdb.firebaseio.com",
  projectId: "sjpa-14841",
  storageBucket: "sjpa-14841.appspot.com",
  messagingSenderId: "552431107911",
  appId: "1:552431107911:web:aacfc21a0aadbd5b59d662",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };
