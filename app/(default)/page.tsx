import Section1 from "@/components/sections/home/Section1";
import { ExperienceCarousel } from "../../components/sections/home/ExperienceCarousel";
import { Hero } from "../../components/sections/home/Hero";
import { Pricing } from "../../components/sections/home/Pricing";
import { WhyCarousel } from "../../components/sections/home/WhyCarousel";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <Hero />
      {/* <WhyCarousel /> */}
      <div id="section-why">
        <Section1 />
      </div>
      <div id="section-experience">
        <ExperienceCarousel />
      </div>
      {/* <Pricing /> */}
    </main>
  );
}
