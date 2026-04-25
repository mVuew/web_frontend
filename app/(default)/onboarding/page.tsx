"use client";

import type { FirebaseError } from "firebase/app";
import { onAuthStateChanged, type User } from "firebase/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useEffect, useState, type FormEvent } from "react";

import { MVuewText } from "../../../components/ui/MVuewText";

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

function getNoticeClasses(tone: NoticeTone) {
  if (tone === "error") {
    return `
border border-border
bg-surface
text-foreground
`;
  }

  if (tone === "success") {
    return `
border border-border
bg-surface
text-foreground
`;
  }

  return `
border border-border
bg-surface
text-muted-foreground
`;
}

function getOnboardingErrorMessage(error: unknown) {
  const code = (error as FirebaseError | undefined)?.code;

  if (code === "auth/user-token-expired") {
    return "Session expired. Sign in again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to complete onboarding.";
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
        text: `Firebase missing: ${missingFirebaseEnv.join(", ")}`,
      },
  );

  const canSubmit = useMemo(() => {
    const ageNumber = Number(age);

    return (
      !busy &&
      name.trim().length >= 2 &&
      homeCountry &&
      phoneNumber &&
      profession &&
      Number.isInteger(ageNumber) &&
      ageNumber >= 13 &&
      preferredCategories.length > 0 &&
      fcmToken
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

        setNotice({
          tone: "info",
          text: "Checking onboarding status...",
        });

        const token = await authUser.getIdToken();

        const verifyResponse = await verifyAuthStatus(token);

        if (!active) return;

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
        if (active) {
          setNotice({
            tone: "error",
            text: getOnboardingErrorMessage(error),
          });
        }
      } finally {
        if (active) {
          setBusy(false);
          setInitializing(false);
        }
      }
    };

    const unsub = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (!authUser) {
        router.replace("/auth");
        return;
      }

      void verifyCurrentUser(authUser);
    });

    return () => {
      active = false;
      unsub();
    };
  }, [router]);

  function toggleCategory(category: string) {
    setPreferredCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      router.replace("/auth");
      return;
    }

    const parsedAge = Number(age);

    if (parsedAge < 13) {
      setNotice({
        tone: "error",
        text: "Age must be at least 13.",
      });
      return;
    }

    setBusy(true);

    try {
      const token = await user.getIdToken();

      const payload: OnboardingPayload = {
        name: name.trim(),
        preferredCategories,
        homeCountry: homeCountry.trim(),
        phoneNumber: phoneNumber.trim(),
        age: parsedAge,
        profession: profession.trim(),
        fcmToken: fcmToken.trim(),
      };

      await submitOnboarding(token, payload);

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
    <main
      className="
relative
min-h-screen
overflow-hidden
bg-background
text-foreground
px-4 py-28 sm:px-6
"
    >
      {/* theme atmosphere */}
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
lg:grid-cols-[1.05fr_.95fr]
lg:items-start
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
            Onboarding Flow
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
                set your{" "}
                <span
                  style={{
                    color: "var(--color-accent-strong)",
                  }}
                >
                  signal profile
                </span>
              </span>
            </h1>

            <p
              className="
max-w-lg
text-base sm:text-lg
leading-relaxed
text-muted-foreground
"
            >
              Shape your multi-perspective feed around what matters to you.
            </p>
          </div>

          <div
            className="
grid gap-4
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
                Account State
              </p>

              <p className="mt-2 text-lg">
                {isNewUser === null
                  ? "Checking profile"
                  : isNewUser
                    ? "New user detected"
                    : "Existing user found"}
              </p>
            </div>

            <div className={cardStyles}>
              <p
                className="
text-xs uppercase
tracking-[0.18em]
text-muted-foreground
"
              >
                Next Step
              </p>

              <p className="mt-2 text-lg">Complete setup and continue.</p>
            </div>
          </div>

          <Link
            href="/auth"
            className="
inline-flex
border border-border
bg-surface
px-5 py-3
text-sm
transition
hover:bg-accent-soft
"
          >
            Back to sign in
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
          <h2 className="text-xl font-semibold">Complete your profile</h2>

          <p
            className="
mt-1 text-sm
text-muted-foreground
"
          >
            Personalize your intelligence feed.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyles}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Home Country"
                value={homeCountry}
                onChange={(e) => setHomeCountry(e.target.value)}
                className={inputStyles}
              />

              <input
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={inputStyles}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={inputStyles}
              />

              <input
                placeholder="Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className={inputStyles}
              />
            </div>


            <div className="space-y-3">
              <p
                className="
                            text-xs uppercase
                            tracking-[0.16em]
                            text-muted-foreground
                            "
              >
                Preferred categories
              </p>

              <div
                data-analytics-component="onboarding_category_selector"
                className="
grid
grid-cols-2
sm:grid-cols-3
gap-2
"
              >
                {CATEGORY_OPTIONS.map((category) => {
                  const selected = preferredCategories.includes(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      data-analytics-label={`Category ${category}`}
                      data-analytics-action="toggle_category"
                      className={`
border
px-3 py-2
text-xs
uppercase
tracking-wider
transition

${selected
                          ? `
bg-surface
border-(--color-accent-strong)
text-foreground
`
                          : `
border-border
bg-background
text-muted-foreground
hover:bg-surface
`
                        }
`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              data-analytics-label="Complete onboarding"
              data-analytics-action="submit_onboarding"
              disabled={!canSubmit || busy}
              className="
w-full
border border-border
bg-surface
px-4 py-3
uppercase
tracking-[0.14em]
transition
hover:bg-accent-soft
disabled:opacity-50
"
            >
              {busy ? "Saving..." : "Complete onboarding"}
            </button>
          </form>

          {notice && (
            <p
              className={`
mt-5 p-3 text-sm
${getNoticeClasses(notice.tone)}
`}
            >
              {notice.text}
            </p>
          )}
        </motion.section>
      </div>
    </main>
  );
}
