"use client";

import EarlyAccessModal from "@/components/modals/EarlyAccessModal";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";

export default function About() {
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
            <button
              onClick={handleBack}
              className="
                px-4 py-2
                rounded-xl
                text-sm
                font-medium
                transition-all
                border border-border
                bg-surface
                text-foreground
                hover:bg-accent/10
                hover:border-slate-500
                whitespace-nowrap
              "
            >
              Back
            </button>

            <div className="flex items-center justify-end gap-3">
              <ThemeToggle />
              <button
                onClick={() => setModalOpen(true)}
                className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  border border-border
                  bg-surface
                  text-foreground
                  hover:bg-accent/10
                  hover:border-slate-500
                  whitespace-nowrap
                "
              >
                Get Early Access
              </button>
            </div>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <h1 className="mb-4 text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl md:text-5xl lg:text-6xl">
              About mVuew
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              mVuew is a platform designed to help you understand complex
              stories, news, and information from multiple perspectives. Our
              mission is to combat misinformation and promote thoughtful,
              informed decision-making.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="mb-4 text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
              Our Mission
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              In today's information-saturated world, it's increasingly
              difficult to get a complete picture. Different sources present
              conflicting narratives, important context is often missed, and
              misinformation spreads quickly.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              mVuew exists to bridge this gap. We aggregate diverse
              perspectives, organize complex information, and present it in a
              way that helps you develop a more complete understanding of any
              story.
            </p>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="mb-5 text-xl font-semibold text-foreground sm:text-2xl md:mb-6 md:text-3xl">
              Our Values
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
              {[
                {
                  title: "Clarity",
                  description:
                    "We break down complex topics into understandable insights.",
                },
                {
                  title: "Diversity",
                  description:
                    "We showcase multiple perspectives to provide balanced coverage.",
                },
                {
                  title: "Integrity",
                  description:
                    "We prioritize accuracy and transparency in all we do.",
                },
                {
                  title: "Accessibility",
                  description:
                    "We make information easily digestible for everyone.",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border p-4 sm:p-6"
                >
                  <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center"
          >
            <h2 className="mb-3 text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl md:text-3xl">
              Ready to see things differently?
            </h2>
            <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
              Join mVuew today and start exploring stories with multiple
              perspectives.
            </p>
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
          </motion.section>
        </div>
      </main>
    </>
  );
}
