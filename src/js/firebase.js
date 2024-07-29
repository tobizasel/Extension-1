console.log("firebase");
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeHp3wPmZete0VHl6IbvLiwn2QSqHnVDA",
  authDomain: "me-contaron-45980.firebaseapp.com",
  projectId: "me-contaron-45980",
  storageBucket: "me-contaron-45980.appspot.com",
  messagingSenderId: "828533224722",
  appId: "1:828533224722:web:677195c0ed1f6694cc2fcb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

console.log(app);