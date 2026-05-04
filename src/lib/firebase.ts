// Import function to initialize Firebase app
import { initializeApp } from "firebase/app";

// Import Firestore database service
import { getFirestore } from "firebase/firestore";

//  Firebase configuration (connects your app to Firebase project)
const firebaseConfig = {
  apiKey: "AIzaSyBJMHQFZXD6TCiaQVPVRCovC8AKBInpidg", // Unique API key for your project
  authDomain: "task-manager-5a950.firebaseapp.com", // Authentication domain
  projectId: "task-manager-5a950", // Project ID in Firebase
  storageBucket: "task-manager-5a950.firebasestorage.app", // Storage bucket for files
  messagingSenderId: "140621088836", // Sender ID for messaging services
  appId: "1:140621088836:web:4fce76ee3db09ba88f1411" // Unique app identifier
};

//  Initialize Firebase app with config
const app = initializeApp(firebaseConfig);

//  Initialize Firestore database and export it
export const db = getFirestore(app);