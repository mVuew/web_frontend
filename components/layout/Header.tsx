"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import colors from "../../constants/colors";
import { firebaseAuth } from "../../lib/firebase";
import { MVuewText } from "../ui/MVuewText";
import ProfileMenu from "../ui/ProfileMenu";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(
    () => firebaseAuth?.currentUser ?? null,
  );
  const [signingOut, setSigningOut] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}

        bg-background/85
        backdrop-blur-xl
        border-b border-border
        supports-[backdrop-filter]:bg-background/70
      `}
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center">
          <MVuewText
            timingScale={1.8}
            className={`
              text-2xl md:text-3xl
              font-semibold
              tracking-tight
              ${colors.text}
              transition-opacity
              group-hover:opacity-80
            `}
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Why mVuew?", "Experiences", "Pricing", "About"].map((item) => (
            <Link
              key={item}
              href="#"
              className="
                text-muted-foreground
                transition-colors duration-200
                hover:text-foreground
              "
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
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
          )}
        </div>
      </div>
    </header>
  );
}
