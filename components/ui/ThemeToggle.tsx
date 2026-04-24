"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../app/providers";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center border border-border  text-foreground transition hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <FiMoon size={18} className="dark:hidden" />
      <FiSun size={18} className="hidden dark:block" />
    </button>
  );
}
