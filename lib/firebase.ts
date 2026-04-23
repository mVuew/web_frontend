import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

function sanitizeFirebaseEnvValue(value: string | undefined) {
  if (!value) {
    return value;
  }

  return value.trim().replace(/^['"]+|['",\s]+$/g, "");
}

const firebaseConfig = {
  apiKey: sanitizeFirebaseEnvValue(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: sanitizeFirebaseEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  ),
  projectId: sanitizeFirebaseEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  ),
  storageBucket: sanitizeFirebaseEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  ),
  messagingSenderId: sanitizeFirebaseEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  ),
  appId: sanitizeFirebaseEnvValue(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};

const requiredConfig: Array<[string, string | undefined]> = [
  ["NEXT_PUBLIC_FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", firebaseConfig.authDomain],
  ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", firebaseConfig.storageBucket],
  [
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    firebaseConfig.messagingSenderId,
  ],
  ["NEXT_PUBLIC_FIREBASE_APP_ID", firebaseConfig.appId],
];

export const missingFirebaseEnv = requiredConfig
  .filter(([, value]) => !value)
  .map(([name]) => name);

export const isFirebaseConfigured = missingFirebaseEnv.length === 0;

const firebaseApp = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
