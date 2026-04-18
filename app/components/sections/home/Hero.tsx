"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

import { PhoneMockup3D } from "./../../ui/PhoneMockup3D";

import MVuewText from "../../ui/MVuewText";
import Button from "../../ui/button";
import EarlyAccessModal from "../../ui/EarlyAccessModal";

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <EarlyAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-16 lg:py-0">
        <div className="container relative z-10 mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-12 items-center min-h-[100dvh] lg:min-h-0 lg:py-32">
          {/* Left — Text */}
          <div className="space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h1 className="font-serif font-medium tracking-tight text-foreground leading-[1.08]">
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]">
                  <MVuewText />
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                  over <span className="text-foreground/45">noise.</span>
                </span>
              </h1>
              <p className="mx-auto lg:mx-0 max-w-lg text-base md:text-lg text-foreground/75 font-serif">
                A news understanding platform for the intellectually curious.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Button
                size="lg"
                className="rounded-none px-10 py-6 text-base md:text-lg font-serif"
                onClick={() => setModalOpen(true)}
              >
                Request Early Access
              </Button>
            </motion.div>
          </div>

          {/* Right — Two Phones (desktop) */}
          <div
            className="relative hidden lg:block w-full"
            style={{ perspective: "1000px", height: "600px" }}
          >
            {/* Back phone — story detail, right side, slightly behind */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute right-0 bottom-0 w-[260px]"
              style={{
                transform: "rotateY(-18deg) rotateX(4deg) scale(0.88)",
                transformStyle: "preserve-3d",
                zIndex: 0,
              }}
            >
              <PhoneMockup3D
                src="/images/app-story-detail.jpeg"
                alt="mVuew Story Detail"
                delay={0.5}
              />
            </motion.div>

            {/* Front phone — splash, left side */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="absolute left-8 top-0 w-[280px]"
              style={{
                transform: "rotateY(-8deg) rotateX(2deg)",
                transformStyle: "preserve-3d",
                zIndex: 10,
              }}
            >
              <PhoneMockup3D
                src="/images/app-splash.jpeg"
                alt="mVuew — Beyond the Surface"
                delay={0}
              />
            </motion.div>
          </div>

          {/* Mobile — both phones side by side, scaled to fit */}
          <div
            className="lg:hidden flex justify-center items-end gap-3 w-full overflow-hidden"
            style={{ height: "280px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{
                transform: "scale(0.46) rotateY(-6deg)",
                transformOrigin: "bottom center",
                flexShrink: 0,
              }}
            >
              <PhoneMockup3D
                src="/images/app-splash.jpeg"
                alt="mVuew — Beyond the Surface"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{
                transform: "scale(0.43) rotateY(6deg)",
                transformOrigin: "bottom center",
                flexShrink: 0,
              }}
            >
              <PhoneMockup3D
                src="/images/app-story-detail.jpeg"
                alt="mVuew Story Detail"
                delay={0.3}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
