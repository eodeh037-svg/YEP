// ============================================================
// Firebase connection point.
//
// Configuration comes from environment variables (see `.env.local`),
// never from hardcoded values. The web SDK config values with the
// NEXT_PUBLIC_ prefix are safe for the browser — Firestore security
// rules are what protect the database.
//
// This module guards against running on the server and initializes
// Firebase only once (singleton pattern).
// ============================================================

import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

// Singleton app + services. `undefined` means "not initialised yet",
// `null` means "unavailable" so we do not retry on every call.
let appInstance: FirebaseApp | undefined | null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null; // client-side only
  if (!isFirebaseConfigured()) return null;

  if (appInstance === undefined) {
    appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return appInstance;
}

export function getFirestoreInstance(): Firestore | null {
  const app = getFirebaseApp();
  if (!app) return null;

  if (!dbInstance) {
    dbInstance = getFirestore(app);
  }
  return dbInstance;
}

export function getAuthInstance(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;

  if (!authInstance) {
    authInstance = getAuth(app);
  }
  return authInstance;
}

export type ApplicationData = {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  cityState: string;
  school: string;
  interest: string;
  reason: string;
  hearAbout: string;
  consent: boolean;
};

export type SubmitResult = {
  ok: boolean;
};

/**
 * Writes a YEP application to the Firestore `applications` collection.
 *
 * When a signed-in user submits, their uid/email are stored alongside the
 * application. Returns `{ ok: false }` (never a fake success) when Firebase
 * is not configured or the write fails.
 */
export async function submitApplication(
  application: ApplicationData,
  user: { uid: string; email: string } | null = null
): Promise<SubmitResult> {
  const db = getFirestoreInstance();
  if (!db) return { ok: false };

  try {
    await addDoc(collection(db, "applications"), {
      fullName: application.fullName,
      age: application.age,
      email: application.email,
      phone: application.phone,
      cityState: application.cityState,
      school: application.school,
      interest: application.interest,
      reason: application.reason,
      hearAbout: application.hearAbout,
      consent: application.consent,
      userId: user?.uid ?? null,
      userEmail: user?.email ?? null,
      createdAt: serverTimestamp(), // Firestore server time, not the client clock
    });
    return { ok: true };
  } catch (error) {
    console.error("[YEP] Failed to save application:", error);
    return { ok: false };
  }
}