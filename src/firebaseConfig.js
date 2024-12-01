import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8HJ-feddc_1RYyZGoZt34lTmIjrk4kP0",
    authDomain: "contact-book-c5618.firebaseapp.com",
    projectId: "contact-book-c5618",
    storageBucket: "contact-book-c5618.firebasestorage.app",
    messagingSenderId: "50179886207",
    appId: "1:50179886207:web:4082577f93d385d872434a",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
