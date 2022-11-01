import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2nRyWqK_HyRPAc0VjtlUSswZ3SkoNx1k",
  authDomain: "unilibre-shark.firebaseapp.com",
  databaseURL: "https://unilibre-shark-default-rtdb.firebaseio.com",
  projectId: "unilibre-shark",
  storageBucket: "unilibre-shark.appspot.com",
  messagingSenderId: "23532606412",
  appId: "1:23532606412:web:d05820d2f4a4c351fc8369",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
