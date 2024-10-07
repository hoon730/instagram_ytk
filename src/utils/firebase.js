import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIpCx_9U6XSTBGXsR1qMBjDSWrYcOHrfk",
  authDomain: "sns-platform-5c897.firebaseapp.com",
  projectId: "sns-platform-5c897",
  storageBucket: "sns-platform-5c897.appspot.com",
  messagingSenderId: "458748192605",
  appId: "1:458748192605:web:f06aa3365f3c309a9c6ab4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
