"use client";

import { useState } from "react";
import Toaster from "../atoms/Toaster";
import { submitEarlyAccess } from "../../lib/api/earlyaccess";

type ToastState = {
  type: "success" | "error" | "info";
  message: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EarlyAccessModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [toast, setToast] = useState<ToastState | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Enter email");
      return;
    }

    setStatus("sending");

    try {
      const response = await submitEarlyAccess({ email });

      setStatus("sent");
      setToast({
        type: "success",
        message: response.message,
      });
    } catch (requestError) {
      setStatus("idle");

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to submit early access request.",
      );

      setToast({
        type: "error",
        message:
          requestError instanceof Error
            ? requestError.message
            : "Unable to submit early access request.",
      });
    }
  }

  function handleClose() {
    setEmail("");
    setError("");
    setStatus("idle");
    onClose();
  }

  return (
    <>
      <Toaster
        type={toast?.type ?? "info"}
        message={toast?.message ?? ""}
        visible={Boolean(toast)}
        onClose={() => setToast(null)}
      />

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="
          fixed inset-0 z-50
          bg-black/55
          backdrop-blur-md
        "
      />

      {/* Modal */}
      <div
        className="
          fixed
          top-1/2 left-1/2
          z-50

          w-[92%]
          max-w-md

          -translate-x-1/2
          -translate-y-1/2

          border border-border
          bg-surface
          shadow-2xl

          p-8 md:p-10
        "
      >
        {/* Accent bar */}
        <div
          className="
            absolute
            top-0 left-0
            h-0.5
            w-full
          "
          style={{
            background: "var(--color-accent-strong)",
          }}
        />

        {/* Close */}
        <button
          onClick={handleClose}
          className="
            absolute top-4 right-4

            text-muted-foreground
            hover:text-foreground

            transition
          "
        >
          ✕
        </button>

        {status === "sent" ? (
          <div
            className="
            text-center
            space-y-5
          "
          >
            <p
              className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
            >
              Access Requested
            </p>

            <h2
              className="
              text-3xl
              tracking-tight
              text-foreground
            "
            >
              You're on the list.
            </h2>

            <p
              className="
              text-sm
              leading-relaxed
              text-muted-foreground
            "
            >
              We’ll notify you when early access opens.
            </p>

            <button
              onClick={handleClose}
              className="
                border border-border
                bg-background
                px-6 py-3
                text-sm

                hover:bg-accent-soft
                transition
              "
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p
              className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-muted-foreground
              mb-3
            "
            >
              Early Access
            </p>

            <h2
              className="
              text-3xl
              tracking-tight
              text-foreground
              mb-3
            "
            >
              Join the waitlist
            </h2>

            <p
              className="
              text-sm
              leading-relaxed
              text-muted-foreground
              mb-8
            "
            >
              Get early access to multi-perspective news intelligence.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full

                  border border-border
                  bg-background

                  px-4 py-3
                  text-sm

                  text-foreground
                  placeholder:text-muted-foreground

                  outline-none
                  transition

                  focus:border-(--color-accent-strong)
                  focus:ring-2
                  focus:ring-(--color-accent)/20
                "
              />

              {error && (
                <p
                  className="
                    text-xs
                  "
                  style={{
                    color: "var(--color-accent-strong)",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="
                  w-full

                  border border-border
                  bg-surface

                  py-3
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.12em]

                  transition
                  hover:bg-accent-soft

                  disabled:opacity-60
                "
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
