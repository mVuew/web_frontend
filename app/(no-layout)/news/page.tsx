"use client";

import Category from "../../../components/molecules/Category";
import categories from "@/constants/category";
import CategoryStory from "../../../components/sections/news/CategoryStory";
import ProfileMenu from "../../../components/ui/ProfileMenu";
import ThemeToggle from "../../../components/ui/ThemeToggle";
import { firebaseAuth } from "../../../lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MVuewText } from "@/components/ui/MVuewText";

export default function News() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const selectedCategory = searchParams.get("category");

  return (
    <div className="min-h-dvh  px-4 py-6 text-foreground sm:px-6">
      <div className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between gap-3">
        <Link href="/" className="text-3xl">
          <MVuewText />
        </Link>

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
              className="inline-flex h-10 items-center border border-border bg-surface px-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <Category categories={categories} />
        <CategoryStory
          categorySlug={selectedCategory}
          categories={categories}
        />
      </div>
    </div>
  );
}
