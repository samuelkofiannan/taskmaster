// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-M6_OOPGxSr8z394U1TlS_Ikzr4Wv5i8",
  authDomain: "taskmaster-3f83a.firebaseapp.com",
  projectId: "taskmaster-3f83a",
  storageBucket: "taskmaster-3f83a.appspot.com",
  messagingSenderId: "368415308903",
  appId: "1:368415308903:web:6e67c7798a1bdae2eca8c2",
  measurementId: "G-0D9C4Y9BD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
