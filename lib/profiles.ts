// ============================================================
// YEP profile helpers (Firestore `profiles` collection).
//
// Every signed-up user gets a profile document keyed by their
// auth uid. Profiles with role === "mentor" are public (shown in
// the mentor directory with contact details); everything else is
// private to the account. Called from client components only.
// ============================================================

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestoreInstance } from "@/lib/firebase";

export type ProfileRole = "mentor" | "mentee";

// Firestore serverTimestamp arrives as a Timestamp with `seconds`.
export type ProfileTimestamp = { seconds: number } | null;

export type MentorProfile = {
  uid: string;
  role: "mentor";
  fullName: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  specialty: string;
  yearsExperience: string;
  education: string;
  createdAt?: ProfileTimestamp;
};

export type MenteeProfile = {
  uid: string;
  role: "mentee";
  fullName: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  createdAt?: ProfileTimestamp;
};

export type Profile = MentorProfile | MenteeProfile;

export type ProfileResult = {
  ok: boolean;
  message?: string;
};

export type ProfileFields = Omit<Profile, "uid" | "createdAt">;

/**
 * Creates or overwrites the profile document for a user.
 * Uses setDoc with the uid as the document id so re-signup /
 * profile updates don't create duplicates.
 */
export async function saveProfile(
  uid: string,
  fields: ProfileFields
): Promise<ProfileResult> {
  const db = getFirestoreInstance();
  if (!db) return { ok: false, message: "Firebase is not configured." };

  try {
    await setDoc(doc(db, "profiles", uid), {
      ...fields,
      uid,
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    console.error("[YEP] Failed to save profile:", error);
    return { ok: false, message: "We couldn't save your profile. Please try again." };
  }
}

/** Loads a single profile by uid, or null if it doesn't exist. */
export async function getProfile(uid: string): Promise<Profile | null> {
  const db = getFirestoreInstance();
  if (!db) return null;

  try {
    const snap = await getDoc(doc(db, "profiles", uid));
    if (!snap.exists()) return null;
    return snap.data() as Profile;
  } catch (error) {
    console.error("[YEP] Failed to load profile:", error);
    return null;
  }
}

/**
 * Loads all mentor profiles for the public directory.
 * Returns [] on error so the directory can show an empty state.
 */
export async function getMentors(): Promise<MentorProfile[]> {
  const db = getFirestoreInstance();
  if (!db) return [];

  try {
    const q = query(collection(db, "profiles"), where("role", "==", "mentor"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as MentorProfile);
  } catch (error) {
    console.error("[YEP] Failed to load mentors:", error);
    return [];
  }
}