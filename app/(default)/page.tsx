import { ExperienceCarousel } from "../../components/sections/home/ExperienceCarousel";
import { Hero } from "../../components/sections/home/Hero";
import { Pricing } from "../../components/sections/home/Pricing";
import { WhyCarousel } from "../../components/sections/home/WhyCarousel";

export default function Home() {
  return (
    <main className="p-10 min-h-screen">
      <Hero />
      <WhyCarousel />
      <ExperienceCarousel />
      <Pricing />
    </main>
  );
}
