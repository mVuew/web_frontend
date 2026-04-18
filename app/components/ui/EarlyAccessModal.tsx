"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EarlyAccessModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter email");
      return;
    }

    setStatus("sending");

    // fake delay (replace with real API later)
    setTimeout(() => {
      setStatus("sent");
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setStatus("idle");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <div className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black border border-gray-300 dark:border-gray-800 p-8 rounded-md">
        
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        {status === "sent" ? (
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              You're on the list
            </p>
            <h2 className="text-2xl font-semibold">
              We'll be in touch.
            </h2>
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-black dark:hover:text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Early Access
            </p>

            <h2 className="text-2xl font-semibold mb-2">
              Join the waitlist
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Enter your email and we'll reach out.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border px-4 py-2 text-sm bg-transparent outline-none border-gray-300 dark:border-gray-700"
              />

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-black text-white dark:bg-white dark:text-black py-2 text-sm font-medium"
              >
                {status === "sending" ? "Sending..." : "Request Access"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}