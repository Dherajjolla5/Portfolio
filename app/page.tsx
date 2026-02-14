"use client";

import Intro from "@/components/Intro";
import Hero from "@/components/hero";
import About from "@/components/About";
import Project from "@/components/projects";
import ExperienceSection from "@/components/Experience";
import { SkillsSection } from "@/components/Skills";
import { PortfolioNavbar } from "@/components/resizable-navbar";
import ChaoticContactSection from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-black min-h-screen">
      <Intro>
        <PortfolioNavbar />
        <Hero />
        <About />
        <Project />
        <SkillsSection />
        <ExperienceSection />
        <ChaoticContactSection />
        <Footer />
      </Intro>
    </main>
  );
}
