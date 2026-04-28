"use client";

import React from "react";
import { motion } from "framer-motion";

import { PhoneMockup3D } from "./../../ui/PhoneMockup3D";

import CTA from "@/components/atoms/CTA";

export function Hero() {
  return (
    <>
      <section
        className="
          relative
          min-h-[92dvh] sm:min-h-dvh
          flex flex-col
          items-center
          justify-center
          overflow-hidden 
        "
      >
        {/* Theme driven atmospheric background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0" />

          {/* subtle grid texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[42px_42px] text-foreground" />
        </div>

        <div
          className="
            container
            relative
            z-10
            mx-auto
            max-w-6xl
            grid
            px-4 sm:px-6
            lg:grid-cols-2
            gap-8 sm:gap-10 lg:gap-12
            items-center
            min-h-[92dvh] sm:min-h-dvh
            lg:min-h-0
            py-18 sm:py-20
            lg:py-32
          "
        >
          {/* LEFT */}
          <div className="space-y-7 sm:space-y-8 lg:space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-4 sm:space-y-5 lg:space-y-6"
            >
              {/* Eyebrow */}
              <div
                className="
                  inline-flex items-center
                  border border-border
                  px-4 py-2
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-muted-foreground
                "
              >
                Multi-perspective journalism
              </div>

              {/* Headline */}
              {/* <h1 className="font-medium tracking-tight text-foreground leading-[1.08]">
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]">
                  <MVuewText />
                </span>

                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                  beyond{" "}
                  <span
                    style={{
                      color: "var(--color-accent-strong)",
                    }}
                  >
                    narratives.
                  </span>
                </span>
              </h1> */}
              <h1 className="block text-3xl font-medium leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                The Only Way to Understand the News Easily
              </h1>

              <p
                className="
                  mx-auto lg:mx-0
                  max-w-xl
                  text-sm sm:text-base md:text-lg
                  text-muted-foreground
                  leading-relaxed
                "
              >
                mVuew turns confusing, scattered updates into one simple view so
                you can see what happened, why it happened, and what it means.
              </p>
            </motion.div>

            <CTA />
            <p className="-mt-6 ms-10 hover:underline cursor-pointer font-bold">Join 500+ early users</p>
          </div>

          {/* Desktop phones */}
          <div
            className="relative hidden lg:block w-full"
            style={{
              perspective: "1000px",
              height: "600px",
            }}
          >
            {/* Back phone */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
              }}
              className="absolute right-0 bottom-0 w-65"
              style={{
                transform: "rotateY(-18deg) rotateX(4deg) scale(.88)",
                transformStyle: "preserve-3d",
                zIndex: 0,
              }}
            >
              <PhoneMockup3D
                src="/images/app-story-detail.jpeg"
                alt="Perspective Comparison"
                delay={0.5}
              />
            </motion.div>

            {/* Front phone */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.1,
              }}
              className="absolute left-8 top-0 w-70"
              style={{
                transform: "rotateY(-8deg) rotateX(2deg)",
                transformStyle: "preserve-3d",
                zIndex: 10,
              }}
            >
              <PhoneMockup3D
                src="/images/app-splash.jpeg"
                alt="mVuew"
                delay={0}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
