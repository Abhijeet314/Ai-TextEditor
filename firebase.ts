import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkuzyBs9BvFkyOUurGIAo8Iw4NMZhrbqo",
    authDomain: "ai-notion-223ec.firebaseapp.com",
    projectId: "ai-notion-223ec",
    storageBucket: "ai-notion-223ec.firebasestorage.app",
    messagingSenderId: "888211969261",
    appId: "1:888211969261:web:80e64c64c7557fb50d28e4"
  };

//initialize firebase (as its next js when request goes it gets on so we have to check if already db is there we take that otherwise we create a new one)

const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export {db};
  
