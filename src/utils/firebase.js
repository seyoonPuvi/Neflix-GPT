// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACkfvz_qPUigAD3e6r7l-TWlU0cTJ9lhA",
  authDomain: "netflix-gpt-7e8c6.firebaseapp.com",
  projectId: "netflix-gpt-7e8c6",
  storageBucket: "netflix-gpt-7e8c6.firebasestorage.app",
  messagingSenderId: "922995212507",
  appId: "1:922995212507:web:43c692349bff556dcc0cfe",
  measurementId: "G-W21D3787N8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
