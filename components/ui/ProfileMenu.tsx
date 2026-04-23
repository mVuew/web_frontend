"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

type ProfileMenuProps = {
  profileLabel?: string;
  profileHref?: string;
  onLogout: () => void | Promise<void>;
  signingOut?: boolean;
  className?: string;
};

export default function ProfileMenu({
  profileLabel = "Profile",
  profileHref = "/onboarding",
  onLogout,
  signingOut = false,
  className = "",
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogoutClick() {
    await onLogout();
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 items-center gap-2 border border-border px-3 text-sm font-medium text-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <FiUser />
        <span className="max-w-28 truncate">{profileLabel}</span>
        <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-48 border border-border bg-surface p-1 shadow-xl"
          role="menu"
        >
          <Link
            href={profileHref}
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
            role="menuitem"
          >
            <FiUser />
            Profile
          </Link>
          <button
            type="button"
            onClick={handleLogoutClick}
            disabled={signingOut}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-700 transition hover:bg-red-700/10 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-500/10"
            role="menuitem"
          >
            <FiLogOut />
            {signingOut ? "Signing out" : "Logout"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
