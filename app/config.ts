
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";;
import 'firebase/auth'
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP9-AwnxdyLZnrMCzXnI1KjSnYgaEYDmg",
  authDomain: "jyaluva-prod.firebaseapp.com",
  projectId: "jyaluva-prod",
  storageBucket: "jyaluva-prod.appspot.com",
  messagingSenderId: "123649436652",
  appId: "1:123649436652:web:c2ff4b29eda98fd0c86ec9",
  measurementId: "G-DQBEQDQ5V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export {app,db};

