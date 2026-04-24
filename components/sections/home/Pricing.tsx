"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { renderWithAnimatedVuew } from "../../ui/AnimatedVuew";
import Button from "../../ui/button";
import EarlyAccessModal from "../../modals/EarlyAccessModal";

const tiers = [
  {
    name: "Free",
    features: ["Daily briefings", "Core timelines", "Ad-supported"],
    cta: "Waitlist",
    action: "modal" as const,
  },

  {
    name: "Plus",
    features: ["Multi-Vuew", "Deep explainers", "Zero ads"],
    cta: "Join Waitlist",
    action: "modal" as const,
  },

  {
    name: "Pro",
    features: ["Expert Vuew", "My Feed", "Audio narratives"],
    cta: "Waitlist",
    action: "modal" as const,
  },

  {
    name: "Institutional",
    features: ["Bulk licensing", "API access", "Dedicated support"],
    cta: "Contact",
    action: "contact" as const,
  },
];

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);

  // default highlighted tier
  const [selectedTier, setSelectedTier] = useState("Plus");

  return (
    <>
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p
              className="
              mb-5
              text-xs
              uppercase
              tracking-[0.2em]
              text-muted-foreground
            "
            >
              Membership
            </p>

            <h2 className="text-4xl md:text-5xl text-foreground tracking-tight">
              Select your tier.
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
              Choose the level of perspective and intelligence that fits how you
              read the world.
            </p>
          </motion.div>

          {/* Grid */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-4
              gap-6
            "
          >
            {tiers.map((tier, i) => {
              const isSelected = selectedTier === tier.name;

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                  }}
                  onClick={() => setSelectedTier(tier.name)}
                  className={`
                    relative
                    cursor-pointer
                    p-8 md:p-10
                    flex flex-col
                    text-center
                    transition-all duration-300
                    border

                    ${
                      isSelected
                        ? `
                        bg-surface
                        border-[var(--color-accent-strong)]
                        shadow-xl
                        -translate-y-1
                        `
                        : `
                        bg-background
                        border-border
                        hover:bg-surface
                        hover:-translate-y-1
                        `
                    }
                  `}
                >
                  {/* top accent */}
                  {isSelected && (
                    <>
                      <div
                        className="
                          absolute top-0 left-0
                          w-full h-[2px]
                        "
                        style={{
                          background: "var(--color-accent-strong)",
                        }}
                      />

                      <span
                        className="
                          absolute
                          top-4 right-4
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          px-2 py-1
                          border border-border
                          bg-background
                          text-muted-foreground
                        "
                      >
                        Selected
                      </span>
                    </>
                  )}

                  {tier.name === "Plus" && (
                    <span
                      className="
                        mb-5
                        text-[11px]
                        uppercase
                        tracking-[0.18em]
                        text-muted-foreground
                      "
                    >
                      Recommended
                    </span>
                  )}

                  <h3
                    className="
                    text-xl
                    text-foreground
                    mb-8
                  "
                  >
                    {tier.name}
                  </h3>

                  <ul
                    className="
                    space-y-4
                    mb-12
                    flex-1
                    text-sm
                    text-muted-foreground
                  "
                  >
                    {tier.features.map((feature, fi) => (
                      <li key={fi}>{renderWithAnimatedVuew(feature)}</li>
                    ))}
                  </ul>

                  <div onClick={(e) => e.stopPropagation()}>
                    {tier.action === "contact" ? (
                      <Button
                        variant={isSelected ? "secondary" : "outline"}
                        className="
                          w-full
                          rounded-none
                        "
                        onClick={() => {
                          window.location.href =
                            "mailto:dinkar.kumar@mtruth.news?subject=Institutional%20Enquiry";
                        }}
                      >
                        {tier.cta}
                      </Button>
                    ) : (
                      <Button
                        variant={isSelected ? "secondary" : "outline"}
                        className="
                          w-full
                          rounded-none
                        "
                        onClick={() => setModalOpen(true)}
                      >
                        {tier.cta}
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* note */}
          <p
            className="
            mt-10
            text-center
            text-sm
            text-muted-foreground
          "
          >
            Click a tier to compare plans.
          </p>
        </div>
      </section>
    </>
  );
}
