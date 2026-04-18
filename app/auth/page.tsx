"use client";

import type { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import MVuewText from "../components/ui/MVuewText";
import {
  firebaseAuth,
  googleProvider,
  isFirebaseConfigured,
  missingFirebaseEnv,
} from "../lib/firebase";

type AuthMode = "signin" | "signup";
type NoticeTone = "error" | "success" | "info";

type Notice = {
  tone: NoticeTone;
  text: string;
};

const cardStyles =
  "relative overflow-hidden border border-black/10 bg-white/85 p-6 shadow-2xl shadow-black/10 backdrop-blur-md dark:border-white/15 dark:bg-black/45 dark:shadow-black/60 sm:p-8";

const inputStyles =
  "w-full border border-black/20 bg-white/90 px-4 py-3 text-sm text-black placeholder:text-black/40 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20 dark:border-white/20 dark:bg-black/35 dark:text-white dark:placeholder:text-white/35 dark:focus:border-red-500 dark:focus:ring-red-500/20";

function getAuthErrorMessage(error: unknown) {
  const code = (error as FirebaseError | undefined)?.code;

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was canceled before completion.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a minute and try again.";
    default:
      return "Authentication failed. Please try again.";
  }
}

function getNoticeClasses(tone: NoticeTone) {
  if (tone === "error") {
    return "border-red-700/25 bg-red-700/10 text-red-800 dark:border-red-400/25 dark:bg-red-500/10 dark:text-red-300";
  }

  if (tone === "success") {
    return "border-emerald-700/25 bg-emerald-700/10 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  return "border-blue-700/25 bg-blue-700/10 text-blue-800 dark:border-blue-400/25 dark:bg-blue-500/10 dark:text-blue-300";
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.95h5.48c-.24 1.27-.96 2.34-2.04 3.05l3.3 2.56c1.93-1.78 3.04-4.39 3.04-7.49 0-.72-.06-1.4-.2-2.06H12z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.75 0 5.06-.9 6.75-2.44l-3.3-2.56c-.9.61-2.06.98-3.45.98-2.66 0-4.91-1.8-5.72-4.22l-3.4 2.63C4.55 19.66 8.03 22 12 22z"
      />
      <path
        fill="#4A90E2"
        d="M6.28 13.76A6.12 6.12 0 0 1 5.95 12c0-.61.12-1.2.33-1.76l-3.4-2.63A10.08 10.08 0 0 0 1.9 12c0 1.62.39 3.15 1.08 4.39l3.3-2.63z"
      />
      <path
        fill="#FBBC05"
        d="M12 6.02c1.49 0 2.82.51 3.87 1.51l2.9-2.9C17.06 3.05 14.75 2 12 2 8.03 2 4.55 4.34 2.88 7.61l3.4 2.63C7.09 7.82 9.34 6.02 12 6.02z"
      />
    </svg>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notice, setNotice] = useState<Notice | null>(
    isFirebaseConfigured
      ? null
      : {
          tone: "error",
          text: `Firebase is not configured. Missing: ${missingFirebaseEnv.join(
            ", "
          )}`,
        }
  );

  useEffect(() => {
    if (!firebaseAuth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  const canSubmit =
    !busy &&
    isFirebaseConfigured &&
    email.trim().length > 0 &&
    password.length > 0 &&
    (mode === "signin" || (fullName.trim().length > 0 && confirmPassword.length > 0));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firebaseAuth) {
      setNotice({
        tone: "error",
        text: "Firebase auth is unavailable. Please check your environment configuration.",
      });
      return;
    }

    if (mode === "signup") {
      if (password.length < 8) {
        setNotice({
          tone: "error",
          text: "Password should be at least 8 characters long.",
        });
        return;
      }

      if (password !== confirmPassword) {
        setNotice({
          tone: "error",
          text: "Password and confirm password do not match.",
        });
        return;
      }
    }

    setBusy(true);
    setNotice({ tone: "info", text: "Authenticating..." });

    try {
      if (mode === "signup") {
        const credentials = await createUserWithEmailAndPassword(
          firebaseAuth,
          email.trim(),
          password
        );

        if (fullName.trim()) {
          await updateProfile(credentials.user, {
            displayName: fullName.trim(),
          });
        }

        setNotice({
          tone: "success",
          text: "Account created successfully. You are now signed in.",
        });
      } else {
        await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
        setNotice({ tone: "success", text: "Signed in successfully." });
      }

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setNotice({ tone: "error", text: getAuthErrorMessage(error) });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!firebaseAuth) {
      setNotice({
        tone: "error",
        text: "Firebase auth is unavailable. Please check your environment configuration.",
      });
      return;
    }

    setBusy(true);
    setNotice({ tone: "info", text: "Opening Google login..." });

    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      setNotice({
        tone: "success",
        text: "Google sign-in completed successfully.",
      });
    } catch (error) {
      setNotice({ tone: "error", text: getAuthErrorMessage(error) });
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    if (!firebaseAuth) {
      return;
    }

    setBusy(true);

    try {
      await signOut(firebaseAuth);
      setNotice({ tone: "success", text: "Signed out successfully." });
    } catch {
      setNotice({
        tone: "error",
        text: "Sign-out failed. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100dvh-160px)] overflow-hidden px-4 py-14 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-red-700/15 blur-3xl dark:bg-red-500/20" />
        <div className="absolute -right-20 top-36 h-72 w-72 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />
        <div className="absolute bottom-0 left-1/2 h-56 w-3xl -translate-x-1/2 bg-linear-to-r from-transparent via-red-700/15 to-transparent blur-2xl dark:via-red-500/20" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
            Secure Access
          </p>

          <div className="space-y-5">
            <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl">
              <span className="block">
                <MVuewText />
              </span>
              <span className="block">
                <span className="text-black/80 dark:text-white/85">account </span>
                <span className="text-red-700 dark:text-red-400">gateway</span>
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-black/70 dark:text-white/70 sm:text-lg">
              Sign in to continue your deep-news experience, or create a new
              account in seconds.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <div className={cardStyles}>
              <p className="text-xs uppercase tracking-[0.18em] text-black/55 dark:text-white/55">
                Email + Password
              </p>
              <p className="mt-2 font-serif text-lg text-black/80 dark:text-white/85">
                Fast, familiar, and secure sign-in flow.
              </p>
            </div>
            <div className={cardStyles}>
              <p className="text-xs uppercase tracking-[0.18em] text-black/55 dark:text-white/55">
                Google Login
              </p>
              <p className="mt-2 font-serif text-lg text-black/80 dark:text-white/85">
                One-click access with your Google account.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-black/20 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black/40 hover:bg-black/5 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
          >
            Back to home
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={cardStyles}
        >
          <div className="relative z-10">
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 border px-4 py-2 text-sm font-medium transition ${
                  mode === "signup"
                    ? "border-red-700 bg-red-700 text-white dark:border-red-500 dark:bg-red-500"
                    : "border-black/15 bg-white/60 text-black/70 hover:bg-black/5 dark:border-white/20 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 border px-4 py-2 text-sm font-medium transition ${
                  mode === "signin"
                    ? "border-red-700 bg-red-700 text-white dark:border-red-500 dark:bg-red-500"
                    : "border-black/15 bg-white/60 text-black/70 hover:bg-black/5 dark:border-white/20 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
                }`}
              >
                Sign in
              </button>
            </div>

            {user ? (
              <div className="mb-6 border border-emerald-700/25 bg-emerald-700/10 p-4 text-sm text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-300">
                <p className="font-medium">
                  Signed in as {user.displayName ?? user.email ?? "User"}
                </p>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={busy}
                  className="mt-3 border border-emerald-700/40 px-3 py-1.5 text-xs uppercase tracking-widest transition hover:bg-emerald-700/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-300/40 dark:hover:bg-emerald-400/10"
                >
                  Sign out
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" ? (
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className={inputStyles}
                    placeholder="Jane Doe"
                  />
                </div>
              ) : null}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputStyles}
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputStyles}
                  placeholder="At least 8 characters"
                />
              </div>

              {mode === "signup" ? (
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className={inputStyles}
                    placeholder="Re-enter your password"
                  />
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full border border-red-700 bg-red-700 px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500 dark:bg-red-500 dark:hover:bg-red-600"
              >
                {busy
                  ? "Please wait"
                  : mode === "signup"
                    ? "Create account"
                    : "Sign in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-black/45 dark:text-white/45">
              <span className="h-px flex-1 bg-black/15 dark:bg-white/15" />
              <span>or</span>
              <span className="h-px flex-1 bg-black/15 dark:bg-white/15" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={busy || !isFirebaseConfigured}
              className="flex w-full items-center justify-center gap-3 border border-black/20 bg-white/80 px-4 py-3 text-sm font-medium text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {notice ? (
              <p
                className={`mt-5 border p-3 text-sm leading-relaxed ${getNoticeClasses(
                  notice.tone
                )}`}
                role="status"
              >
                {notice.text}
              </p>
            ) : null}

            <p className="mt-6 text-center text-xs leading-relaxed text-black/55 dark:text-white/55">
              By continuing, you agree to use mVuew responsibly and protect your
              account credentials.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}