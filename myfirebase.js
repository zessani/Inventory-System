// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkNpCFMUPjiyQqZ5PaX4daxHXslE8KS70",
  authDomain: "inventory-management-6ba92.firebaseapp.com",
  projectId: "inventory-management-6ba92",
  storageBucket: "inventory-management-6ba92.appspot.com",
  messagingSenderId: "66495708908",
  appId: "1:66495708908:web:fcd8df863f61922bfb2fc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}