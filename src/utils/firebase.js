import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getApp, getApps } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAQZTNSis27AhSHE1MQyYwuaAllNdHuwp0",
  authDomain: "ytg-instagram.firebaseapp.com",
  projectId: "ytg-instagram",
  storageBucket: "ytg-instagram.appspot.com",
  messagingSenderId: "938815740201",
  appId: "1:938815740201:web:99541068728ed2900f7f38"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
