import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAMBKONW7twxMRM9YW_PoGEAdV2E-x0wA",
  authDomain: "my-auth-app-24208.firebaseapp.com",
  projectId: "my-auth-app-24208",
  storageBucket: "my-auth-app-24208.firebasestorage.app",
  messagingSenderId: "486262678245",
  appId: "1:486262678245:web:1546b973583f956c94ea0c"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged }
