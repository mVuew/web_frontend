"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../app/providers";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center border border-border  text-foreground transition hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
      aria-label="Toggle theme"
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
