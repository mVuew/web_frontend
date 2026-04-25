"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

type ToastType = "success" | "error" | "info";

type ToasterProps = {
  type?: ToastType;
  message: string;
  visible: boolean;
  onClose?: () => void;
};

const iconMap = {
  success: <FiCheckCircle />,
  error: <FiAlertCircle />,
  info: <FiInfo />,
};

const labelMap = {
  success: "Success",
  error: "Notice",
  info: "Info",
};

export default function Toaster({
  type = "success",
  message,
  visible,
  onClose,
}: ToasterProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 3500);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: -24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -18,
          }}
          transition={{
            duration: 0.28,
          }}
          className="
fixed
top-5
right-5
z-50
"
        >
          <div
            className="
relative 
w-80
max-w-[92vw]

border border-border
bg-surface
shadow-2xl
overflow-hidden
"

          >
            {/* top accent */}
            <div
              className="
absolute
top-0 left-0
w-full h-0.5
"
              style={{
                background:
                  type === "error"
                    ? "var(--color-accent-strong)"
                    : "var(--color-accent)",
              }}
            />

            <div className="p-4 flex gap-3">
              {/* icon */}
              <div
                className="
mt-0.5
text-lg
shrink-0
"
                style={{
                  color:
                    type === "error"
                      ? "var(--color-accent-strong)"
                      : "var(--color-accent)",
                }}
              >
                {iconMap[type]}
              </div>

              <div className="flex-1">
                <div
                  className="
text-xs
uppercase
tracking-[0.16em]
text-muted-foreground
mb-1
"
                >
                  {labelMap[type]}
                </div>

                <p
                  className="
text-sm
leading-relaxed
text-foreground
"
                >
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="
ml-2
text-muted-foreground
hover:text-foreground
transition
"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
