"use client";

import type { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type User,
} from "firebase/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import Toaster from "../../../components/atoms/Toaster";
import {MVuewText} from "../../../components/ui/MVuewText";
import { verifyAuthStatus } from "../../../lib/api/user";
import {
  firebaseAuth,
  googleProvider,
  isFirebaseConfigured,
  missingFirebaseEnv,
} from "../../../lib/firebase";

type AuthMode = "signin" | "signup";
type NoticeTone = "error" | "success" | "info";

type Notice = {
  tone: NoticeTone;
  text: string;
  persistent?: boolean;
};

const cardStyles =
  "relative overflow-hidden border border-border bg-surface p-6 shadow-2xl shadow-black/10 backdrop-blur-md dark:shadow-black/40 sm:p-8";

const inputStyles =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20 dark:focus:border-red-500 dark:focus:ring-red-500/20";

function getAuthErrorMessage(error: unknown) {
  const firebaseError = error as FirebaseError | undefined;
  const code = firebaseError?.code;
  const message = firebaseError?.message ?? "";

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password.";
    case "auth/invalid-api-key":
      return "Firebase API key is invalid for this project. Verify NEXT_PUBLIC_FIREBASE_API_KEY in your environment.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled in Firebase Console. Enable it under Authentication > Sign-in method.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support or use another account.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was canceled before completion.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a minute and try again.";
    case "auth/network-request-failed":
      return "Network error while contacting Firebase. Check internet connection and try again.";
    default:
      if (message.includes("INVALID_LOGIN_CREDENTIALS")) {
        return "Invalid login credentials. Double-check email/password or create an account first.";
      }

      if (message.includes("EMAIL_NOT_FOUND")) {
        return "No account found with this email. Create an account first.";
      }

      if (message.includes("INVALID_PASSWORD")) {
        return "Incorrect password. Please try again.";
      }

      if (message.includes("USER_DISABLED")) {
        return "This account is disabled.";
      }

      if (message.includes("API_KEY_INVALID")) {
        return "Firebase API key is invalid or restricted. Update Firebase API key configuration.";
      }

      return "Authentication failed. Please try again.";
  }
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
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(
    isFirebaseConfigured
      ? null
      : {
          tone: "error",
          persistent: true,
          text: `Firebase is not configured. Missing: ${missingFirebaseEnv.join(
            ", ",
          )}`,
        },
  );
  const [toastVisible, setToastVisible] = useState(Boolean(notice));

  function showNotice(tone: NoticeTone, text: string, persistent = false) {
    setNotice({ tone, text, persistent });
  }

  useEffect(() => {
    if (!notice) {
      setToastVisible(false);
      return;
    }

    setToastVisible(true);

    if (notice.persistent) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToastVisible(false);
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [notice]);

  useEffect(() => {
    if (!firebaseAuth || !isFirebaseConfigured) {
      return;
    }

    let active = true;

    const verifyExistingSession = async (authUser: User) => {
      try {
        setBusy(true);
        showNotice(
          "info",
          "You are already signed in. Checking account status...",
        );

        const idToken = await authUser.getIdToken();
        const verification = await verifyAuthStatus(idToken, authUser);

        console.log("[Auth] Existing session verify response", verification);

        if (!active) {
          return;
        }

        router.replace(verification.onboarded ? "/news" : "/onboarding");
      } catch {
        if (!active) {
          return;
        }

        showNotice(
          "error",
          "Unable to verify existing session. Please sign in again.",
        );
      } finally {
        if (active) {
          setBusy(false);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (!authUser) {
        return;
      }

      void verifyExistingSession(authUser);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [router]);

  const canSubmit =
    !busy &&
    isFirebaseConfigured &&
    email.trim().length > 0 &&
    password.length > 0 &&
    (mode === "signin" ||
      (fullName.trim().length > 0 && confirmPassword.length > 0));

  async function logAuthSuccessDetails(
    method: "email-password" | "google",
    authUser: User,
  ) {
    const idToken = await authUser.getIdToken();

    console.log("[Auth] Incoming sign-in details", {
      method,
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      providerIds: authUser.providerData.map((provider) => provider.providerId),
      idToken,
    });

    return idToken;
  }

  async function verifyAndRouteUser(authUser: User, idToken: string) {
    showNotice("info", "Verifying account status...");

    const verification = await verifyAuthStatus(idToken, authUser);

    console.log("[Auth] Verify response", verification);

    if (verification.onboarded) {
      showNotice("success", "Welcome back. Redirecting to your news feed...");
      router.push("/news");
      return;
    }

    showNotice("info", "Let's complete onboarding before entering your feed.");
    router.push("/onboarding");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firebaseAuth) {
      showNotice(
        "error",
        "Firebase auth is unavailable. Please check your environment configuration.",
      );
      return;
    }

    if (mode === "signup") {
      if (password.length < 8) {
        showNotice("error", "Password should be at least 8 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        showNotice("error", "Password and confirm password do not match.");
        return;
      }
    }

    if (mode === "signin") {
      try {
        const signInMethods = await fetchSignInMethodsForEmail(
          firebaseAuth,
          email.trim(),
        );

        if (signInMethods.length === 0) {
          showNotice(
            "error",
            "No account found for this email. Please create an account first.",
          );
          setMode("signup");
          return;
        }

        if (!signInMethods.includes("password")) {
          showNotice(
            "error",
            "This email is registered with another provider. Use Google sign-in instead.",
          );
          return;
        }
      } catch (error) {
        showNotice("error", getAuthErrorMessage(error));
        return;
      }
    }

    setBusy(true);
    showNotice("info", "Authenticating...");

    try {
      if (mode === "signup") {
        const credentials = await createUserWithEmailAndPassword(
          firebaseAuth,
          email.trim(),
          password,
        );

        if (fullName.trim()) {
          await updateProfile(credentials.user, {
            displayName: fullName.trim(),
          });
        }

        const idToken = await logAuthSuccessDetails(
          "email-password",
          credentials.user,
        );

        showNotice(
          "success",
          "Account created successfully. You are now signed in.",
        );

        await verifyAndRouteUser(credentials.user, idToken);
      } else {
        const credentials = await signInWithEmailAndPassword(
          firebaseAuth,
          email.trim(),
          password,
        );

        const idToken = await logAuthSuccessDetails(
          "email-password",
          credentials.user,
        );

        showNotice("success", "Signed in successfully.");

        await verifyAndRouteUser(credentials.user, idToken);
      }

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      showNotice("error", getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!firebaseAuth) {
      showNotice(
        "error",
        "Firebase auth is unavailable. Please check your environment configuration.",
      );
      return;
    }

    setBusy(true);
    showNotice("info", "Opening Google login...");

    try {
      const credentials = await signInWithPopup(firebaseAuth, googleProvider);

      const idToken = await logAuthSuccessDetails("google", credentials.user);

      showNotice("success", "Google sign-in completed successfully.");

      await verifyAndRouteUser(credentials.user, idToken);
    } catch (error) {
      showNotice("error", getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100dvh-160px)] overflow-hidden px-4 py-14 text-foreground sm:px-6">
      <Toaster
        type={notice?.tone}
        message={notice?.text ?? ""}
        visible={Boolean(notice) && toastVisible}
      />
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
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Secure Access
          </p>

          <div className="space-y-5">
            <h1 className="text-foreground text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">
                <MVuewText />
              </span>
              <span className="block">
                <span className="text-muted-foreground">account </span>
                <span className="text-red-700 dark:text-red-500">gateway</span>
              </span>
            </h1>
            <p className="text-muted-foreground max-w-lg text-base leading-relaxed sm:text-lg">
              Sign in to continue your deep-news experience, or create a new
              account in seconds.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <div className={cardStyles}>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                Email + Password
              </p>
              <p className="text-foreground mt-2 font-serif text-lg">
                Fast, familiar, and secure sign-in flow.
              </p>
            </div>
            <div className={cardStyles}>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                Google Login
              </p>
              <p className="text-foreground mt-2 font-serif text-lg">
                One-click access with your Google account.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
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
                    : "border-border bg-surface text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
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
                    : "border-border bg-surface text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                Sign in
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" ? (
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-muted-foreground text-xs uppercase tracking-[0.16em]"
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
                  className="text-muted-foreground text-xs uppercase tracking-[0.16em]"
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
                  className="text-muted-foreground text-xs uppercase tracking-[0.16em]"
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
                    className="text-muted-foreground text-xs uppercase tracking-[0.16em]"
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

            <div className="text-muted-foreground my-6 flex items-center gap-3 text-xs uppercase tracking-[0.16em]">
              <span className="h-px flex-1 bg-border" />
              <span>or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={busy || !isFirebaseConfigured}
              className="flex w-full items-center justify-center gap-3 border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-white/10"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="text-muted-foreground mt-6 text-center text-xs leading-relaxed">
              By continuing, you agree to use mVuew responsibly and protect your
              account credentials.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
