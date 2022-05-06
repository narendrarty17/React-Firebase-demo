import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1FiEbmrzt6Mw6DkPjWBWQdsufjzDv9_0",
  authDomain: "e-shop-94986.firebaseapp.com",
  projectId: "e-shop-94986",
  storageBucket: "e-shop-94986.appspot.com",
  messagingSenderId: "979183968375",
  appId: "1:979183968375:web:fb817d07d9fd2c7c38e672",
  measurementId: "G-P79MZ1PGPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
