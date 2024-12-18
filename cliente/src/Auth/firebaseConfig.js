import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7xy2xti5Jc2hqQbw7M9FaYQvF5g5_z6c",
    authDomain: "innoventa-62262.firebaseapp.com",
    projectId: "innoventa-62262",
    storageBucket: "innoventa-62262.firebasestorage.app",
    messagingSenderId: "794774322376",
    appId: "1:794774322376:web:53af274219b53f862cb9fd",
    measurementId: "G-N3CW2FZYMF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);