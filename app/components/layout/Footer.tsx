"use client";
import { StoreButton } from '../ui/StoreButton';
import Link from 'next/link';

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { label: 'Facebook',  href: 'https://www.facebook.com/mtruth.news',    icon: <FacebookIcon /> },
  { label: 'Instagram', href: 'https://www.instagram.com/mtruth.news',   icon: <InstagramIcon /> },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/mtruth', icon: <LinkedInIcon /> },
  { label: 'X',         href: 'https://x.com/mtruth_news',               icon: <XIcon /> },
];

export function Footer() {
  return (
    <footer id="about" className="bg-background pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col items-center justify-center text-center">
        <Link href="/">
          <span className="font-serif text-3xl font-medium tracking-wide text-foreground mb-12 block cursor-pointer">mVuew</span>
        </Link>

        {/* Store buttons */}
        <div className="space-y-4 mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Available on</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6 mb-12">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Contact button */}
        <div className="mb-10">
          <a
            href="mailto:dinkar.kumar@mtruth.news?subject=General%20Enquiry"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border/60 text-sm font-serif text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground mb-12">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Settings</Link>
        </div>

        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} mVuew. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
