// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5f9tIwQ3_s_yTTxedSrrolATrsmoJjlQ",
  authDomain: "ins-loginpg.firebaseapp.com",
  projectId: "ins-loginpg",
  storageBucket: "ins-loginpg.appspot.com",
  messagingSenderId: "389855710537",
  appId: "1:389855710537:web:bca6060c85eb04213d5e98",
  measurementId: "G-84EN6XKL1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);