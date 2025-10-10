// Users should replace these with their actual Firebase config

/*
 * FIREBASE SETUP INSTRUCTIONS:
 *
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Authentication with Google Sign-In provider
 * 3. Create a Firestore database
 * 4. Copy your Firebase config and replace the template below
 * 5. Set up Firestore security rules (see firestore-rules-template.txt)
 *
 * Collections structure:
 * - users: User profiles and financial data
 * - posts: User posts with tags
 * - comments: Comments on posts
 * - follows: Follow relationships
 * - likes: Post and comment likes
 */

// export const firebaseConfigTemplate = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// }

// Uncomment and use this when you have your Firebase config:
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
