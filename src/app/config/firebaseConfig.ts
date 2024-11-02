// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1dnhCZVdHamEzZCkyo2Ci4a9pSclITdY",
  authDomain: "tradieproj.firebaseapp.com",
  projectId: "tradieproj",
  storageBucket: "tradieproj.appspot.com",
  messagingSenderId: "325266204085",
  appId: "1:325266204085:web:6166929e8d73fd5a3325fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const userauth = getAuth(app);