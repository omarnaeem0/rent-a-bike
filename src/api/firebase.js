// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX96EUmoJAD46_kG4T0fkucx3KWvxC-tI",
  authDomain: "rent-a-bike-44445.firebaseapp.com",
  databaseURL: "https://rent-a-bike-44445-default-rtdb.firebaseio.com",
  projectId: "rent-a-bike-44445",
  storageBucket: "rent-a-bike-44445.appspot.com",
  messagingSenderId: "819213661602",
  appId: "1:819213661602:web:5cc3b23808dbc125746efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
