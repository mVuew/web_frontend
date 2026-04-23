"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../lib/firebase";
import { MVuewText } from "../ui/MVuewText";
import ProfileMenu from "../ui/ProfileMenu";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  // 🔥 scroll state
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!firebaseAuth) return;

    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  // 🔥 scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down → hide
        setShowHeader(false);
      } else {
        // scrolling up → show
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

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
        backdrop-blur-md  border-b border-zinc-800
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <MVuewText
            timingScale={1.8}
            className="text-2xl font-medium tracking-wide text-white cursor-pointer text-foreground"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <Link href="#" className="hover:text-white">
            Why mVuew?
          </Link>
          <Link href="#" className="hover:text-white">
            Experience
          </Link>
          <Link href="#" className="hover:text-white">
            Pricing
          </Link>
          <Link href="#" className="hover:text-white">
            About
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
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
              className="border border-red-700/40 bg-red-700/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-700/20 transition"
            >
              Get Early Access
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}