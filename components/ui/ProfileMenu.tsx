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
      if (!containerRef.current) return;

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
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="
inline-flex
h-10
items-center
gap-2

border border-border
bg-surface

px-3
text-sm
font-medium
text-foreground

transition-all duration-200

hover:bg-accent-soft
hover:border-[var(--color-accent)]

rounded-none
"
      >
        <FiUser className="opacity-80" />

        <span className="max-w-28 truncate">{profileLabel}</span>

        <FiChevronDown
          className={`
transition-transform duration-200
${open ? "rotate-180" : ""}
`}
        />
      </button>

      {/* dropdown */}
      {open && (
        <div
          role="menu"
          className="
absolute
right-0
top-full
z-50
mt-2
w-52

border border-border

p-1

shadow-2xl
backdrop-blur-md
"
style={{
              background: "var(--color-background-translucent)",
            }}
        >
          {/* subtle top accent */}
          <div
            className="absolute top-0 left-0 h-[2px] w-full"
            style={{
              background: "var(--color-accent-strong)",
            }}
          />

          <Link
            href={profileHref}
            onClick={() => setOpen(false)}
            role="menuitem"
            className="
relative
flex
w-full
items-center
gap-3
px-3 py-2.5

text-sm
text-foreground

transition
hover:bg-accent-soft
"
          >
            <FiUser />
            Profile
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogoutClick}
            disabled={signingOut}
            className="
flex
w-full
items-center
gap-3

px-3 py-2.5
text-left
text-sm

transition
disabled:opacity-60
disabled:cursor-not-allowed

hover:bg-accent-soft
"
            style={{
              color: "var(--color-accent-strong)",
            }}
          >
            <FiLogOut />

            {signingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
