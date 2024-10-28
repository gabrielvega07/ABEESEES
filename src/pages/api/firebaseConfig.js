// lib/firebaseConfig.js
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1zT3s3TxIZFWQ6PkDTEuH9I8Cd17vtMU",
  authDomain: "a-bee-sees.firebaseapp.com",
  databaseURL: "https://a-bee-sees-default-rtdb.firebaseio.com",
  projectId: "a-bee-sees",
  storageBucket: "a-bee-sees.appspot.com",
  messagingSenderId: "935236754459",
  appId: "1:935236754459:web:92a1c11d8a35b80ab2acbe",
  measurementId: "G-881BCD1MHM"
};

// Inicializar Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(FirebaseApp);
const auth = getAuth(FirebaseApp);

export default FirebaseApp;
export { storage };
export { auth };
