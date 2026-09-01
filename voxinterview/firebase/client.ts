// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoxfR3PgbNwI-wv1TSvQ9NmSDCZ3PizKo",
  authDomain: "voxinterview-eefc3.firebaseapp.com",
  projectId: "voxinterview-eefc3",
  storageBucket: "voxinterview-eefc3.firebasestorage.app",
  messagingSenderId: "300110025344",
  appId: "1:300110025344:web:57ec05635fb7bfaa654c65",
  measurementId: "G-Q9MNPRYV2G"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);