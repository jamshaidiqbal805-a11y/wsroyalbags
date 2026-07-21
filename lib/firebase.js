import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj0DY1iggzkRdjbdccA70wraDJMh8AJ1w",
  authDomain: "wsroyalbags.firebaseapp.com",
  projectId: "wsroyalbags",
  storageBucket: "wsroyalbags.firebasestorage.app",
  messagingSenderId: "845669148701",
  appId: "1:845669148701:web:042a1aa43555ff43937ef4",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);