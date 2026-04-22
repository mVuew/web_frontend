"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { firebaseAuth } from "../../lib/firebase";
import { useTheme } from "../../providers";
import MVuewText from "../ui/MVuewText";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!firebaseAuth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  async function handleSignOut() {
    if (!firebaseAuth) {
      return;
    }

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
    <header className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        {/* Logo */}
        <Link href="/">
           <MVuewText />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="#" className="hover:text-gray-500 font-heading">
            Why mVuew?
          </Link>
          <Link href="#" className="hover:text-gray-500 font-body">
            Experience
          </Link>
          <Link href="#" className="hover:text-gray-500">
            Pricing
          </Link>
          <Link href="#" className="hover:text-gray-500">
            About
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 border border-black/20 px-3 py-2 text-sm font-medium text-black transition hover:bg-black/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
              >
                <FiUser />
                <span className="max-w-30 truncate">{profileLabel}</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="inline-flex items-center gap-2 border border-red-700 bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500 dark:bg-red-500 dark:hover:bg-red-600"
              >
                <FiLogOut />
                {signingOut ? "Signing out" : "Logout"}
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="bg-gray-200 cursor-pointer dark:bg-white text-black px-4 py-2 rounded-md text-sm font-medium"
            >
              Get Early Access
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
