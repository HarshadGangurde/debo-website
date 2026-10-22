/**
 * Firebase web-app configuration. These values are identifiers, not secrets: they ship to every browser by design.
 * What actually protects the data is the Realtime Database rules (database.rules.json) and Firebase Authentication.
 * Override per environment with NEXT_PUBLIC_FIREBASE_* variables if needed.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyC7RcciPmlMl4Bz7XBBnbfO2g8DaIY4Crc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "deboistech-website.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "https://deboistech-website-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "deboistech-website",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "deboistech-website.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "708449732713",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:708449732713:web:e75d81521de8fc4483baf8",
};
export const DB_URL = firebaseConfig.databaseURL;
