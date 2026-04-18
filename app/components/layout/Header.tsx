"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import MVuewText from "../ui/MVuewText";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  if (!mounted) return null; // prevents hydration mismatch

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
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {/* CTA Button */}
          <Link href="/auth">
            <button className="bg-gray-200 cursor-pointer dark:bg-white text-black px-4 py-2 rounded-md text-sm font-medium">
              Get Early Access
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
