import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCcHedWZXJBNIdlYNqVCHqxtmLPLEQFkjk",
    authDomain: "karthikdb.vercel.app",
    projectId: "karthikdb-2c9cd",
    storageBucket: "karthikdb-2c9cd.appspot.com",
    messagingSenderId: "386700003637",
    appId: "1:386700003637:web:00de1d2fd273443315247c",
    measurementId: "G-309VH7XNN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);