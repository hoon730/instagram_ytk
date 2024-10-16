import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getApp, getApps } from "firebase/app";

// ytg firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAQZTNSis27AhSHE1MQyYwuaAllNdHuwp0",
//   authDomain: "ytg-instagram.firebaseapp.com",
//   projectId: "ytg-instagram",
//   storageBucket: "ytg-instagram.appspot.com",
//   messagingSenderId: "938815740201",
//   appId: "1:938815740201:web:99541068728ed2900f7f38",
// };

// 지선님꺼
// const firebaseConfig = {
//   apiKey: "AIzaSyB5f9tIwQ3_s_yTTxedSrrolATrsmoJjlQ",
//   authDomain: "ins-loginpg.firebaseapp.com",
//   projectId: "ins-loginpg",
//   storageBucket: "ins-loginpg.appspot.com",
//   messagingSenderId: "389855710537",
//   appId: "1:389855710537:web:bca6060c85eb04213d5e98",
//   measurementId: "G-84EN6XKL1V",
// };

// 동훈 2nd sns-platform
// const firebaseConfig = {
//   apiKey: "AIzaSyAIpCx_9U6XSTBGXsR1qMBjDSWrYcOHrfk",
//   authDomain: "sns-platform-5c897.firebaseapp.com",
//   projectId: "sns-platform-5c897",
//   storageBucket: "sns-platform-5c897.appspot.com",
//   messagingSenderId: "458748192605",
//   appId: "1:458748192605:web:f06aa3365f3c309a9c6ab4"
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const db = getFirestore(app);

// 동훈  ytg-instagram-2nd
// const firebaseConfig = {
//   apiKey: "AIzaSyDICinBeRvZCV2OHSfApLsTudugCEc0-jM",
//   authDomain: "ytg-instagram-2nd.firebaseapp.com",
//   projectId: "ytg-instagram-2nd",
//   storageBucket: "ytg-instagram-2nd.appspot.com",
//   messagingSenderId: "694538495457",
//   appId: "1:694538495457:web:9aa575fe5cbbbc7fe7dea0"
// };

// 동훈  ytg-instagram-3rd
const firebaseConfig = {
  apiKey: "AIzaSyDUxtRALmwMwQZrN9DvS0CPUhm71_DEMgo",
  authDomain: "ytg-instagram-3rd.firebaseapp.com",
  projectId: "ytg-instagram-3rd",
  storageBucket: "ytg-instagram-3rd.appspot.com",
  messagingSenderId: "718613168797",
  appId: "1:718613168797:web:39a51c85254a1c1cf24a74"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
