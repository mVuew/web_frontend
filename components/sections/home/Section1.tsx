"use client";
import { motion } from "framer-motion";
import { PhoneMockup3D } from "@/components/ui/PhoneMockup3D";
import CTA from "@/components/atoms/CTA";

export default function Section1() {
  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-10 max-w-4xl text-center sm:mb-12 lg:mb-16"
          >
            {/* <span className="
            inline-flex
            border border-border
            px-4 py-2
            text-xs
            uppercase
            tracking-[0.2em]
            text-muted-foreground
            mb-8
          ">
            Why mVuew
          </span> */}

            <h2 className="mx-auto max-w-4xl text-3xl leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              A must-read for anyone who wants to{" "}
              <span
                style={{
                  color: "var(--color-accent-strong)",
                }}
              >
                actually understand
              </span>{" "}
              the news.
            </h2>
          </motion.div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            {/* LEFT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative order-2 mx-auto w-full max-w-55 sm:max-w-80 lg:order-1 lg:mx-0 lg:max-w-90"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                }}
                className="w-full"
                style={{
                  transform: "rotateY(-10deg) rotateX(3deg) scale(0.88)",
                  transformStyle: "preserve-3d",
                  zIndex: 0,
                }}
              >
                <PhoneMockup3D
                  src="/images/app-story-detail.jpeg"
                  alt="Perspective Comparison"
                  className="mx-auto"
                  delay={0.5}
                />
              </motion.div>
              <div
                className="
                absolute
                -bottom-4
                left-1/2
                -translate-x-1/2
                sm:left-28
                sm:translate-x-0
                bg-background
                border border-border
                px-4 py-2.5
                shadow-xl
              "
              >
                <p className="text-base font-medium text-foreground sm:text-2xl">
                  1 view
                </p>

                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  multiple perspectives
                </p>
              </div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="order-1 space-y-5 lg:order-2 lg:max-w-160 lg:space-y-6"
            >
              <div
                className="
                space-y-3
                text-sm leading-relaxed
                sm:text-base md:text-lg
                text-muted-foreground
              "
              >
                <p>
                  Do you open multiple articles just to understand one story?
                </p>

                <p>Do different sources leave you more confused than clear?</p>

                <p>
                  Do you feel like you read the news but still don’t fully get
                  it?
                </p>

                <p>
                  Do you rely on headlines or social media hoping it’s enough?
                </p>
              </div>

              <div className="h-px bg-border" />

              <div
                className="
                space-y-4
                text-sm leading-relaxed
                sm:text-base md:text-lg
                text-muted-foreground
              "
              >
                <p>
                  Most news platforms optimize for speed and opinions — not
                  helping you actually understand what’s happening.
                </p>

                <p>
                  So you switch tabs, compare sources, and connect the dots
                  yourself.
                </p>

                <p className="text-foreground">
                  <span
                    style={{
                      color: "var(--color-accent-strong)",
                    }}
                  >
                    mVuew
                  </span>{" "}
                  brings everything into one simple view.
                </p>
              </div>

              {/* Features */}
              <div
                className="
                space-y-2.5
                pt-1
              "
              >
                {[
                  "Clear story summaries",
                  "Multiple perspectives in one place",
                  "Timelines showing how stories evolve",
                  "Expert insights explaining what it means",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-start gap-3
                    text-foreground
                      text-sm sm:text-base
                  "
                  >
                    <div
                      className="mt-2 h-0.5 w-5 sm:w-6"
                      style={{
                        background: "var(--color-accent-strong)",
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              <p
                className="
                text-sm sm:text-base md:text-lg
                text-foreground
                pt-1
              "
              >
                No switching tabs. No guessing. Just understanding in minutes.
              </p>

              <CTA />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
