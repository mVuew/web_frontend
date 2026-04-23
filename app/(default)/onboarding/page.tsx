"use client";

import type { FirebaseError } from "firebase/app";
import { onAuthStateChanged, type User } from "firebase/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import {MVuewText} from "../../../components/ui/MVuewText";
import {
  submitOnboarding,
  type OnboardingPayload,
  verifyAuthStatus,
} from "../../../lib/api/user";
import {
  firebaseAuth,
  isFirebaseConfigured,
  missingFirebaseEnv,
} from "../../../lib/firebase";

type NoticeTone = "error" | "success" | "info";

type Notice = {
  tone: NoticeTone;
  text: string;
};

const CATEGORY_OPTIONS = [
  "POLITICS",
  "TECHNOLOGY",
  "BUSINESS",
  "SCIENCE",
  "HEALTH",
  "ENTERTAINMENT",
  "SPORTS",
  "WORLD",
] as const;

const cardStyles =
  "relative overflow-hidden border border-black/10 bg-white/85 p-6 shadow-2xl shadow-black/10 backdrop-blur-md dark:border-white/15 dark:bg-black/45 dark:shadow-black/60 sm:p-8";

const inputStyles =
  "w-full border border-black/20 bg-white/90 px-4 py-3 text-sm text-black placeholder:text-black/40 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-700/20 dark:border-white/20 dark:bg-black/35 dark:text-white dark:placeholder:text-white/35 dark:focus:border-red-500 dark:focus:ring-red-500/20";

function getNoticeClasses(tone: NoticeTone) {
  if (tone === "error") {
    return "border-red-700/25 bg-red-700/10 text-red-800 dark:border-red-400/25 dark:bg-red-500/10 dark:text-red-300";
  }

  if (tone === "success") {
    return "border-emerald-700/25 bg-emerald-700/10 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  return "border-blue-700/25 bg-blue-700/10 text-blue-800 dark:border-blue-400/25 dark:bg-blue-500/10 dark:text-blue-300";
}

function getOnboardingErrorMessage(error: unknown) {
  const code = (error as FirebaseError | undefined)?.code;

  if (code === "auth/user-token-expired") {
    return "Your session expired. Please sign in again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to complete onboarding right now. Please try again.";
}

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(
    isFirebaseConfigured && Boolean(firebaseAuth),
  );
  const [busy, setBusy] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [homeCountry, setHomeCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [fcmToken, setFcmToken] = useState("cXs_Token_abc123");
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
  const [notice, setNotice] = useState<Notice | null>(
    isFirebaseConfigured
      ? null
      : {
          tone: "error",
          text: `Firebase is not configured. Missing: ${missingFirebaseEnv.join(
            ", ",
          )}`,
        },
  );

  const canSubmit = useMemo(() => {
    const ageNumber = Number(age);

    return (
      !busy &&
      name.trim().length >= 2 &&
      homeCountry.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      profession.trim().length > 0 &&
      Number.isInteger(ageNumber) &&
      ageNumber >= 13 &&
      preferredCategories.length > 0 &&
      fcmToken.trim().length > 0
    );
  }, [
    age,
    busy,
    fcmToken,
    homeCountry,
    name,
    phoneNumber,
    preferredCategories,
    profession,
  ]);

  useEffect(() => {
    if (!firebaseAuth || !isFirebaseConfigured) {
      return;
    }

    let active = true;

    const verifyCurrentUser = async (authUser: User) => {
      try {
        setBusy(true);
        setNotice({ tone: "info", text: "Checking onboarding status..." });

        const idToken = await authUser.getIdToken();
        const verifyResponse = await verifyAuthStatus(idToken, authUser);

        console.log("[Onboarding] Verify response", verifyResponse);

        if (!active) {
          return;
        }

        if (verifyResponse.onboarded) {
          router.replace("/news");
          return;
        }

        setUser(authUser);
        setIsNewUser(verifyResponse.newUser);
        setName(verifyResponse.user.name ?? authUser.displayName ?? "");
        setHomeCountry(verifyResponse.user.homeCountry ?? "");
        setPhoneNumber(verifyResponse.user.phoneNumber ?? "");
        setAge(verifyResponse.user.age ? String(verifyResponse.user.age) : "");
        setProfession(verifyResponse.user.profession ?? "");
        setPreferredCategories(verifyResponse.user.preferredCategories ?? []);
        setNotice({
          tone: "info",
          text: "Complete onboarding to unlock your personalized feed.",
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setNotice({
          tone: "error",
          text: getOnboardingErrorMessage(error),
        });
      } finally {
        if (active) {
          setBusy(false);
          setInitializing(false);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (!authUser) {
        if (active) {
          setInitializing(false);
          router.replace("/auth");
        }

        return;
      }

      void verifyCurrentUser(authUser);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [router]);

  function toggleCategory(category: string) {
    setPreferredCategories((previous) => {
      if (previous.includes(category)) {
        return previous.filter((item) => item !== category);
      }

      return [...previous, category];
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      setNotice({
        tone: "error",
        text: "No active user session found. Please sign in again.",
      });
      router.replace("/auth");
      return;
    }

    const parsedAge = Number(age);

    if (!Number.isInteger(parsedAge) || parsedAge < 13) {
      setNotice({
        tone: "error",
        text: "Please provide a valid age (13 or above).",
      });
      return;
    }

    if (preferredCategories.length === 0) {
      setNotice({
        tone: "error",
        text: "Select at least one preferred category.",
      });
      return;
    }

    setBusy(true);
    setNotice({ tone: "info", text: "Saving onboarding details..." });

    try {
      const idToken = await user.getIdToken();
      const payload: OnboardingPayload = {
        name: name.trim(),
        preferredCategories,
        homeCountry: homeCountry.trim(),
        phoneNumber: phoneNumber.trim(),
        age: parsedAge,
        profession: profession.trim(),
        fcmToken: fcmToken.trim(),
      };

      console.log("[Onboarding] Submitting payload", payload);

      const onboardingResponse = await submitOnboarding(idToken, payload, user);

      console.log("[Onboarding] Onboarding response", onboardingResponse);

      setNotice({
        tone: "success",
        text: "Onboarding completed. Redirecting to your feed...",
      });
      router.push("/news");
    } catch (error) {
      setNotice({
        tone: "error",
        text: getOnboardingErrorMessage(error),
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

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
            Onboarding Flow
          </p>

          <div className="space-y-5">
            <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-black dark:text-white sm:text-6xl lg:text-7xl">
              <span className="block">
                <MVuewText />
              </span>
              <span className="block text-black/80 dark:text-white/85">
                set your{" "}
                <span className="text-red-700 dark:text-red-400">
                  signal profile
                </span>
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-black/70 dark:text-white/70 sm:text-lg">
              Tell us what matters to you so we can build a smarter, more
              relevant feed from day one.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <div className={cardStyles}>
              <p className="text-xs uppercase tracking-[0.18em] text-black/55 dark:text-white/55">
                Account State
              </p>
              <p className="mt-2 font-serif text-lg text-black/80 dark:text-white/85">
                {isNewUser === null
                  ? "Checking your profile"
                  : isNewUser
                    ? "New user detected"
                    : "Existing user profile found"}
              </p>
            </div>
            <div className={cardStyles}>
              <p className="text-xs uppercase tracking-[0.18em] text-black/55 dark:text-white/55">
                Next Step
              </p>
              <p className="mt-2 font-serif text-lg text-black/80 dark:text-white/85">
                Finish setup and continue to your personalized news dashboard.
              </p>
            </div>
          </div>

          <Link
            href="/auth"
            className="inline-flex items-center gap-2 border border-black/20 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black/40 hover:bg-black/5 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
          >
            Back to sign in
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={cardStyles}
        >
          <div className="relative z-10">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Complete your profile
            </h2>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Fields map to the onboarding request body in your API walkthrough.
            </p>

            {initializing ? (
              <p className="mt-6 border border-blue-700/25 bg-blue-700/10 p-3 text-sm text-blue-800 dark:border-blue-400/25 dark:bg-blue-500/10 dark:text-blue-300">
                Preparing your onboarding form...
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={inputStyles}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="homeCountry"
                      className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                    >
                      Home country
                    </label>
                    <input
                      id="homeCountry"
                      type="text"
                      value={homeCountry}
                      onChange={(event) => setHomeCountry(event.target.value)}
                      className={inputStyles}
                      placeholder="India"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="age"
                      className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                    >
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      min={13}
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      className={inputStyles}
                      placeholder="28"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="phoneNumber"
                      className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                    >
                      Phone number
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className={inputStyles}
                      placeholder="+919876543210"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="profession"
                      className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                    >
                      Profession
                    </label>
                    <input
                      id="profession"
                      type="text"
                      value={profession}
                      onChange={(event) => setProfession(event.target.value)}
                      className={inputStyles}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="fcmToken"
                    className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60"
                  >
                    FCM token
                  </label>
                  <input
                    id="fcmToken"
                    type="text"
                    value={fcmToken}
                    onChange={(event) => setFcmToken(event.target.value)}
                    className={inputStyles}
                    placeholder="cXs_Token_abc123"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 dark:text-white/60">
                    Preferred categories
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {CATEGORY_OPTIONS.map((category) => {
                      const selected = preferredCategories.includes(category);

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => toggleCategory(category)}
                          className={`border px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${
                            selected
                              ? "border-red-700 bg-red-700 text-white dark:border-red-500 dark:bg-red-500"
                              : "border-black/20 bg-white/70 text-black/75 hover:bg-black/5 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || busy}
                  className="w-full border border-red-700 bg-red-700 px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  {busy ? "Saving" : "Complete onboarding"}
                </button>
              </form>
            )}

            {notice ? (
              <p
                className={`mt-5 border p-3 text-sm leading-relaxed ${getNoticeClasses(
                  notice.tone,
                )}`}
                role="status"
              >
                {notice.text}
              </p>
            ) : null}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
