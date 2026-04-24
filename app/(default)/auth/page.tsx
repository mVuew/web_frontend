"use client";

import type { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  updateProfile,
  type User,
} from "firebase/auth";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import Toaster from "../../../components/atoms/Toaster";
import { MVuewText } from "../../../components/ui/MVuewText";

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

const cardStyles = `
relative
overflow-hidden
border border-border
bg-surface
p-6 sm:p-8
shadow-xl
backdrop-blur-md
`;

const inputStyles = `
w-full
border border-border
bg-surface
px-4 py-3
text-sm
text-foreground
placeholder:text-muted-foreground
outline-none
transition

focus:border-[var(--color-accent-strong)]
focus:ring-2
focus:ring-[var(--color-accent)]/20
`;

function getAuthErrorMessage(error: unknown) {
  const firebaseError = error as FirebaseError | undefined;
  const code = firebaseError?.code;
  const message = firebaseError?.message ?? "";

  switch (code) {
    case "auth/operation-not-allowed":
      return "Google sign-in is not enabled in Firebase Authentication.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase Authentication settings.";
    case "auth/invalid-app-credential":
      return "Invalid app credential for Google sign-in. Check Firebase web config.";
    case "auth/network-request-failed":
      return "Network error during sign-in. Check your internet connection.";
    case "auth/email-already-in-use":
      return "This email already exists.";
    case "auth/invalid-email":
      return "Enter a valid email.";
    case "auth/invalid-credential":
      return "Invalid credentials.";
    case "auth/user-not-found":
      return "Account not found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/popup-closed-by-user":
      return "Google sign in cancelled.";
    case "auth/popup-blocked":
      return "Popup blocked by browser. Redirecting to Google sign in...";
    case "auth/cancelled-popup-request":
      return "Sign in popup was interrupted. Redirecting to Google sign in...";
    default:
      if (message.includes("INVALID_LOGIN_CREDENTIALS")) {
        return "Invalid login credentials.";
      }

      return "Authentication failed.";
  }
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
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
        d="M6.28 13.76A6.12 6.12 0 015.95 12c0-.61.12-1.2.33-1.76l-3.4-2.63A10.08 10.08 0 001.9 12c0 1.62.39 3.15 1.08 4.39l3.3-2.63z"
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
          text: `Firebase missing: ${missingFirebaseEnv.join(", ")}`,
        },
  );

  const [toastVisible, setToastVisible] = useState(Boolean(notice));

  function showNotice(tone: NoticeTone, text: string, persistent = false) {
    setNotice({
      tone,
      text,
      persistent,
    });
  }

  useEffect(() => {
    if (!notice) {
      setToastVisible(false);
      return;
    }

    setToastVisible(true);

    if (notice.persistent) return;

    const timer = window.setTimeout(() => {
      setToastVisible(false);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!firebaseAuth || !isFirebaseConfigured) {
      return;
    }

    let active = true;

    const verifyExistingSession = async (authUser: User) => {
      try {
        setBusy(true);

        const token = await authUser.getIdToken();

        const verification = await verifyAuthStatus(token);

        if (!active) return;

        router.replace(verification.onboarded ? "/news" : "/onboarding");
      } catch {
        if (active) {
          showNotice(
            "info",
            "Google sign-in succeeded, but account verification failed. Continuing to onboarding.",
          );
          router.replace("/onboarding");
        }
      } finally {
        if (active) setBusy(false);
      }
    };

    const unsub = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) {
        void verifyExistingSession(authUser);
      }
    });

    return () => {
      active = false;
      unsub();
    };
  }, [router]);

  const canSubmit =
    !busy &&
    email &&
    password &&
    (mode === "signin" || (fullName && confirmPassword));

  async function verifyAndRouteUser(token: string) {
    try {
      const verification = await verifyAuthStatus(token);

      router.push(verification.onboarded ? "/news" : "/onboarding");
    } catch {
      showNotice("info", "Signed in. Continue with onboarding...");
      router.push("/onboarding");
    }
  }

  useEffect(() => {
    if (!firebaseAuth || !isFirebaseConfigured) {
      return;
    }

    const auth = firebaseAuth;

    const consumeRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (!result) {
          return;
        }

        const token = await result.user.getIdToken();
        await verifyAndRouteUser(token);
      } catch (error) {
        showNotice("error", getAuthErrorMessage(error));
      }
    };

    void consumeRedirectResult();
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!firebaseAuth) {
      showNotice("error", "Firebase unavailable.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      showNotice("error", "Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      if (mode === "signup") {
        const creds = await createUserWithEmailAndPassword(
          firebaseAuth,
          email.trim(),
          password,
        );

        if (fullName) {
          await updateProfile(creds.user, {
            displayName: fullName.trim(),
          });
        }

        const token = await creds.user.getIdToken();

        await verifyAndRouteUser(token);
      } else {
        const creds = await signInWithEmailAndPassword(
          firebaseAuth,
          email.trim(),
          password,
        );

        const token = await creds.user.getIdToken();

        await verifyAndRouteUser(token);
      }
    } catch (error) {
      showNotice("error", getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!firebaseAuth) return;

    const auth = firebaseAuth;

    setBusy(true);

    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      showNotice("error", getAuthErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground px-4 py-28 sm:px-6 ">
      <Toaster
        type={notice?.tone}
        message={notice?.text ?? ""}
        visible={Boolean(notice) && toastVisible}
      />

      {/* theme background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "var(--theme-dark-global-gradient)",
          }}
        />
      </div>

      <div
        className="
mx-auto
grid
max-w-6xl
gap-10
lg:grid-cols-[1.1fr_0.9fr]
lg:items-center
"
      >
        {/* LEFT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p
            className="
text-xs
uppercase
tracking-[0.2em]
text-muted-foreground
"
          >
            Secure Access
          </p>

          <div className="space-y-5">
            <h1
              className="
text-5xl
sm:text-6xl
lg:text-7xl
tracking-tight
leading-[1.05]
"
            >
              <span className="block">
                <MVuewText />
              </span>

              <span className="block">
                <span className="text-muted-foreground">account</span>{" "}
                <span
                  style={{
                    color: "var(--color-accent-strong)",
                  }}
                >
                  gateway
                </span>
              </span>
            </h1>

            <p
              className="
max-w-lg
text-base
sm:text-lg
leading-relaxed
text-muted-foreground
"
            >
              Continue exploring multiple perspectives through your secure
              account.
            </p>
          </div>

          <div
            className="
grid
gap-4
sm:grid-cols-2
max-w-xl
"
          >
            <div className={cardStyles}>
              <p
                className="
text-xs uppercase
tracking-[0.18em]
text-muted-foreground
"
              >
                Email Access
              </p>

              <p className="mt-2 text-lg">Secure traditional sign in.</p>
            </div>

            <div className={cardStyles}>
              <p
                className="
text-xs uppercase
tracking-[0.18em]
text-muted-foreground
"
              >
                Google Access
              </p>

              <p className="mt-2 text-lg">One-click identity login.</p>
            </div>
          </div>

          <Link
            href="/"
            className="
inline-flex
border border-border
bg-surface
px-5 py-3
text-sm
hover:bg-accent-soft
transition
"
          >
            Back to home
          </Link>
        </motion.section>

        {/* RIGHT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.08,
          }}
          className={cardStyles}
        >
          <div className="mb-6 flex gap-2">
            {["signup", "signin"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item as AuthMode)}
                className={`
flex-1
border
px-4 py-2
text-sm
font-medium
transition

${
  mode === item
    ? `
bg-surface
border-(--color-accent-strong)
text-foreground
`
    : `
border-border
text-muted-foreground
hover:bg-accent-soft
`
}
`}
              >
                {item === "signup" ? "Sign up" : "Sign in"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <input
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputStyles}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyles}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles}
            />

            {mode === "signup" && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputStyles}
              />
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="
w-full
border border-border
bg-surface
px-4 py-3
uppercase
tracking-[0.14em]
hover:bg-accent-soft
transition
disabled:opacity-50
"
            >
              {busy
                ? "Please wait"
                : mode === "signup"
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <div
            className="
my-6
flex items-center gap-3
text-xs uppercase
tracking-[0.16em]
text-muted-foreground
"
          >
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={busy}
            className="
w-full
flex items-center
justify-center gap-3
border border-border
bg-surface
px-4 py-3
hover:bg-accent-soft
transition
"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p
            className="
mt-6
text-center
text-xs
leading-relaxed
text-muted-foreground
"
          >
            Use mVuew responsibly and protect your credentials.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
