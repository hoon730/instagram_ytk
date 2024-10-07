// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIpCx_9U6XSTBGXsR1qMBjDSWrYcOHrfk",
  authDomain: "sns-platform-5c897.firebaseapp.com",
  projectId: "sns-platform-5c897",
  storageBucket: "sns-platform-5c897.appspot.com",
  messagingSenderId: "458748192605",
  appId: "1:458748192605:web:f06aa3365f3c309a9c6ab4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
