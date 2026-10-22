"use client";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebase-config";

// Lazily initialised, client-only. Analytics is intentionally not loaded.
const app = () => (getApps().length ? getApp() : initializeApp(firebaseConfig));
export const auth = () => getAuth(app());
export const database = () => getDatabase(app());
