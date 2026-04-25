"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import colors from "../../constants/colors";
import { firebaseAuth } from "../../lib/firebase";
import { MVuewText } from "../ui/MVuewText";
import ThemeToggle from "../ui/ThemeToggle";
import EarlyAccessModal from "@/components/modals/EarlyAccessModal";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(
    () => firebaseAuth?.currentUser ?? null,
  );
  const [signingOut, setSigningOut] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!firebaseAuth) return;

    const unsub = onAuthStateChanged(firebaseAuth, setUser);
    return unsub;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  async function handleSignOut() {
    if (!firebaseAuth) return;

    setSigningOut(true);

    try {
      await signOut(firebaseAuth);
      router.push("/auth");
    } finally {
      setSigningOut(false);
    }
  }

  const profileLabel =
    user?.displayName ?? user?.email?.split("@")[0] ?? "Profile";

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <header
        data-analytics-component="header"
        className={`
        fixed top-0 left-0 w-full z-50
        transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}

        bg-background/85
        backdrop-blur-xl
        border-b border-border
        supports-backdrop-filter:bg-background/70
      `}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-4 lg:px-6">
          {/* Logo */}
          <Link
            href="/"
            data-analytics-label="Header Logo"
            data-analytics-action="navigate_home"
            className="group flex items-center"
          >
            {/* <MVuewText
              timingScale={1.8}
              className={`
              text-xl sm:text-2xl md:text-3xl
              font-semibold
              tracking-tight
              ${colors.text}
              transition-opacity
              group-hover:opacity-80
            `}
            /> */}
            <h1
              className={`
              text-2xl md:text-3xl
              font-semibold
              tracking-tight
              ${colors.text}
              transition-opacity
              group-hover:opacity-80
            `}
            >
              mVuew
            </h1>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium lg:gap-8">
            <button
              onClick={() => handleNavigation("section-why")}
              data-analytics-label="Why mVuew"
              data-analytics-action="scroll_to_section"
              className="
              text-muted-foreground
              transition-colors duration-200
              hover:text-foreground
              bg-transparent
              border-none
              cursor-pointer
            "
            >
              Why mVuew?
            </button>
            <button
              onClick={() => handleNavigation("section-experience")}
              data-analytics-label="Experiences"
              data-analytics-action="scroll_to_section"
              className="
              text-muted-foreground
              transition-colors duration-200
              hover:text-foreground
              bg-transparent
              border-none
              cursor-pointer
            "
            >
              Experiences
            </button>
            <Link
              href="/about"
              data-analytics-label="About"
              data-analytics-action="navigate_about"
              className="
              text-muted-foreground
              transition-colors duration-200
              hover:text-foreground
            "
            >
              About
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* {user ? (
            <ProfileMenu
              profileLabel={profileLabel}
              profileHref="/onboarding"
              onLogout={handleSignOut}
              signingOut={signingOut}
            />
          ) : (
            <Link
              href="/auth"
              className="
                px-4 py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                border border-border
                bg-surface
                text-foreground
                hover:bg-accent/10
                hover:border-slate-500
              "
            >
              Sign In
            </Link>
          )} */}

            <div>
              <button
                onClick={() => setModalOpen(true)}
                data-analytics-label="Early Access"
                data-analytics-action="open_early_access_modal"
                className="
                px-3 py-2 sm:px-4
                rounded-xl
                text-xs sm:text-sm
                font-medium
                transition-all
                border border-border
                bg-surface
                text-foreground
                hover:bg-accent/10
                hover:border-slate-500
                whitespace-nowrap
              "
              >
                Early Access
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
