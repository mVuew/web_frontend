"use client";

import NolayoutHeader from "@/components/atoms/NolayoutHeader";
import EarlyAccessModal from "@/components/modals/EarlyAccessModal";
import { motion } from "framer-motion";
import { useState } from "react";
import privacySections  from "@/constants/policy";

export default function PrivacyPolicyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  return (
    <>
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <main className="min-h-screen pb-14 pt-6 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <NolayoutHeader
            onBack={handleBack}
            onOpenModal={() => setModalOpen(true)}
          />

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="  bg-surface/70 p-5 backdrop-blur-sm sm:p-8"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-sm">
              Legal
            </p>
            <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Last updated: April 2025
            </p>
          </motion.header>

          <div className="space-y-4 sm:space-y-5">
            {privacySections.map((section, idx) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="bg-background/60 p-5 shadow-[0_10px_30px_-25px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-7"
              >
                <h2 className="mb-2 text-lg font-semibold text-foreground sm:mb-3 sm:text-xl">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {section.body}
                </p>
              </motion.section>
            ))}
          </div>
           <button
              onClick={() => setModalOpen(true)}
              className="
                px-4 py-2.5 sm:px-6 sm:py-3
               
                text-sm sm:text-base
                font-medium
                transition-all
                border border-border
                bg-surface
                text-foreground
                hover:bg-accent/10
                hover:border-slate-500
              "
            >
              Get Early Access
            </button>
        </div>
        
      </main>
    </>
  );
}
