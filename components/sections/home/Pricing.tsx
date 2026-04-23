"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { renderWithAnimatedVuew } from '../../ui/AnimatedVuew';
import Button from "../../ui/button";
import EarlyAccessModal from "../../ui/EarlyAccessModal";

const tiers = [
  {
    name: "Free",
    features: ["Daily briefings", "Core timelines", "Ad-supported"],
    highlighted: false,
    cta: "Waitlist",
    action: "modal" as const,
  },
  {
    name: "Plus",
    features: ["multi-Vuew", "Deep explainers", "Zero ads"],
    highlighted: true,
    cta: "Join Waitlist",
    action: "modal" as const,
  },
  {
    name: "Pro",
    features: ["Expert Vuew", "my Feed", "Audio narrations"],
    highlighted: false,
    cta: "Waitlist",
    action: "modal" as const,
  },
  {
    name: "Institutional",
    features: ["Bulk licensing", "API access", "Dedicated support"],
    highlighted: false,
    cta: "Contact",
    action: "contact" as const,
  },
];

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <section id="pricing" className="py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-foreground text-center mb-24"
          >
            Select your tier.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-border/60">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`bg-background p-8 md:p-10 flex flex-col items-center text-center ${
                  tier.highlighted ? 'relative' : ''
                }`}
              >
                {tier.highlighted && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "rgba(196,30,58,0.03)" }}
                    aria-hidden="true"
                  />
                )}
                <h3 className="font-serif text-xl text-foreground mb-8 relative z-10">{tier.name}</h3>
                <ul className="space-y-4 mb-12 flex-1 text-sm text-muted-foreground relative z-10">
                  {tier.features.map((f, fi) => <li key={fi}>{renderWithAnimatedVuew(f)}</li>)}
                </ul>
                <div className="w-full relative z-10">
                  {tier.action === 'contact' ? (
                    <Button
                      variant="outline"
                      className="w-full rounded-none font-serif border-transparent hover:bg-transparent hover:underline"
                      onClick={() => {
                        window.location.href = 'mailto:dinkar.kumar@mtruth.news?subject=Institutional%20Enquiry';
                      }}
                    >
                      {tier.cta}
                    </Button>
                  ) : tier.highlighted ? (
                    <Button
                      className="w-full rounded-none font-serif bg-foreground text-background hover:opacity-90"
                      onClick={() => setModalOpen(true)}
                    >
                      {tier.cta}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full rounded-none font-serif"
                      onClick={() => setModalOpen(true)}
                    >
                      {tier.cta}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
