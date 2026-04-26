"use client";

import { StoreButton } from "../ui/StoreButton";
import Link from "next/link";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/mtruth.news", icon: <FacebookIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/mtruth.news", icon: <InstagramIcon /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/mtruth", icon: <LinkedInIcon /> },
  { label: "X", href: "https://x.com/mtruth_news", icon: <XIcon /> },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800  py-20">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Left: Logo + copyright */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-center md:text-left">
          <Link href="/" className="text-lg font-semibold text-foreground">
            mVuew
          </Link>
          <span className="text-xs text-zinc-500">
            © {new Date().getFullYear()} All rights reserved
          </span>
        </div>

        {/* Center: Links */}
        <div className="flex justify-center gap-6 text-sm text-zinc-400">
          <Link href="/policy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms
          </Link>
          {/* <Link href="/cookies" className="hover:text-white transition">
            Cookies
          </Link> */}
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
        </div>

        {/* Right: Social + store */}
        <div className="flex items-center justify-center md:justify-end gap-4">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-red-500 transition"
              aria-label={label}
            >
              {icon}
            </a>
          ))}

          <div className="hidden sm:flex items-center gap-2 ml-4">
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </div>
        </div>
      </div>
    </footer>
  );
}