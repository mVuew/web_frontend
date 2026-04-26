"use client";

import NolayoutHeader from "@/components/atoms/NolayoutHeader";
import EarlyAccessModal from "@/components/modals/EarlyAccessModal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import categories from "@/constants/cookies";
// interface CookieCategory {
//   id: string;
//   name: string;
//   description: string;
//   required: boolean;
//   defaultOn: boolean;
// }


function Toggle({
  enabled,
  onChange,
  disabled,
}: {
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      aria-checked={enabled}
      role="switch"
      className={`relative h-5 w-10 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-foreground" : "bg-border"} ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

export default function CookiesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.id, c.defaultOn])),
  );
  const [saved, setSaved] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  const toggle = (id: string) => {
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem("mtruth-cookies", JSON.stringify(prefs));
    setSaved(true);
  };

  return (
    <>
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="min-h-screen bg-background text-foreground">
        <main className="pb-32 pt-6 sm:pt-10">
          <div className="container mx-auto px-6 max-w-5xl">
            <NolayoutHeader
              onBack={handleBack}
              onOpenModal={() => setModalOpen(true)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                Legal
              </p>
              <h1 className="mb-6 text-5xl text-foreground md:text-6xl">
                Cookie Settings
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                We use cookies to power mVuew and improve your experience.
                Review each category below and choose which you are comfortable
                with. Your choices are saved to this device.
              </p>
            </motion.div>

            <div className="space-y-0">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className="border-t border-border/60 py-10 flex items-start justify-between gap-8"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg text-foreground">{cat.name}</h2>
                      {cat.required && (
                        <span className="border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-1 shrink-0">
                    <Toggle
                      enabled={prefs[cat.id]}
                      onChange={() => toggle(cat.id)}
                      disabled={cat.required}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border/60 pt-10 flex items-center gap-6">
              <button
                onClick={save}
                className="bg-foreground px-8 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-80"
              >
                Save Preferences
              </button>
              {saved && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground"
                >
                  Preferences saved.
                </motion.p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
