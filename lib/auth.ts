// ============================================================
// Firebase Authentication helpers (email + password).
//
// These functions are called from client components only. Each one
// returns `{ ok: true }` on success or `{ ok: false, message }` on
// failure so the UI can show a friendly error.
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";

export type AuthResult = {
  ok: boolean;
  message?: string;
  uid?: string;
};

// Maps a Firebase auth error code to a friendly, human-readable message.
function authErrorMessage(error: unknown): string {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";

  const messages: Record<string, string> = {
    "auth/email-already-in-use":
      "An account with this email already exists. Try signing in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests":
      "Too many attempts. Please wait a moment and try again.",
    "auth/invalid-login-credentials":
      "Incorrect email or password. Please try again.",
  };

  return messages[code] ?? "Something went wrong. Please try again.";
}

/** Creates a new account with email + password. Returns the new uid. */
export async function signUpWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const auth = getAuthInstance();
  if (!auth) return { ok: false, message: "Firebase is not configured." };

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    return { ok: true, uid: credential.user.uid };
  } catch (error) {
    return { ok: false, message: authErrorMessage(error) };
  }
}

/** Signs an existing user in with email + password. */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const auth = getAuthInstance();
  if (!auth) return { ok: false, message: "Firebase is not configured." };

  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: authErrorMessage(error) };
  }
}

/** Signs the current user out. */
export async function signOutUser(): Promise<AuthResult> {
  const auth = getAuthInstance();
  if (!auth) return { ok: false, message: "Firebase is not configured." };

  try {
    await signOut(auth);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: authErrorMessage(error) };
  }
}
