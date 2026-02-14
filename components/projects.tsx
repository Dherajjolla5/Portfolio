"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

export default function Project() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(null)
  );

  return (
    <div id="projects" className="py-10 px-4">
      {/* --- Section Headings --- */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-neutral-100 font-sans">
          My Technical Projects
        </h2>
        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A focused collection of my work in react and next.js, and Full-Stack engineering.
        </p>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-50"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between items-start p-4 shrink-0">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-lg"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {/* REMOVED: CTA Button section completely */}
                  
                </div>
                
                {/* Scrollable Content Area */}
                <div className="relative px-4 pb-4 overflow-y-auto flex-1 custom-scrollbar">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm lg:text-base flex flex-col items-start gap-4 dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* --- Grid Configuration: 2 cols mobile, 4 cols desktop --- */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <motion.div
              layoutId={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-neutral-900 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 cursor-pointer flex flex-col"
            >
              <div className="flex gap-4 flex-col w-full h-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-40 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col flex-1">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-xs mt-1"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// --- UPDATED DATA: All GitHub/View Repo buttons removed ---
const cards = [
  // --- CLUSTER A: AI / Machine Learning ---
  {
    description: "Create By React and Talwind css / Embedded AI",
    title: "James Henry",
    src: "/websiteone.png", 
    // REMOVED: ctaText and ctaLink
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>The Problem:</strong> A fully responsive e-commerce website developed for James Henry Printing, a professional printing services company based in South Africa. The website showcases their extensive range of printing products and services while providing a seamless user experience for potential customers.
          </p>
          <p>
            <strong>Key Features:</strong>
          </p>
          <p>
            <strong>Modern UI/UX Design:</strong> Clean, professional layout with prominent call-to-action buttons and eye-catching "New Year Special" banners
          </p>
          <p>
            <strong>Product Showcase Grid:</strong> Display of 6 main product categories including Business Cards, Flyers, Vehicle Wraps, Posters, Cookbooks, and Books
          </p>
          <p>
            <strong>Service Process Flow:</strong> Visual 5-step guide explaining the printing journey from design selection to delivery
          </p>
          <p>
            <strong>Trust Indicators:</strong> Client testimonials, achievement statistics (10+ years, 50K+ orders, 100% satisfaction), and industry leader logos
          </p>
          <p>
            <strong>Comprehensive FAQ Section:</strong>Accordion-style FAQ addressing common customer queries about turnaround times, design services, file formats, and delivery
          </p>
          <p>
            <strong>Blog Section:</strong> Latest industry insights and tips for customers
          </p>
          <p>
            <strong>WhatsApp Integration:</strong> Direct chat button for instant customer support
          </p>
          <p>
            <strong>Technologies Used:</strong>
          </p>
          <p> React.js for building dynamic user interface components</p>
          <p> Tailwind CSS for responsive and utility-first styling</p>
          <p> React Hooks (useState, useEffect) for state management</p>
          <p> Fully Responsive Design that works seamlessly on mobile, tablet, and desktop</p>
        </div>
      );
    },
  },
  {
    description: "I Create the automation for Saas Business",
    title: "Shawn Harik",
    src: "/websitetwo.png",
    // REMOVED: ctaText and ctaLink
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>The Problem:</strong> A professional business website developed for Trident Pool Solutions, a veteran-owned swimming pool construction and maintenance company based in Belleview, Florida. The website effectively communicates their brand values—integrity, quality, and military precision—while showcasing their comprehensive range of pool services.
          </p>
          <p>
            <strong>Lead Generation Automation:</strong>
          </p>
          <p>
            <strong>Smart Contact Forms:</strong> Auto-populates service type based on page visited
          </p>
          <p>
            <strong>Automatic Email Routing:</strong> Automatically sends emails to the appropriate department based on form selection
          </p>
          <p>
            <strong>Service Process Flow:</strong> Instant confirmation email triggers
          </p>
        </div>
      );
    },
  },

  // --- CLUSTER C: Software / Full-Stack ---
  {
    description: "React and Next.js Development ",
    title: "Maake And Shores",
    src: "/webistethree.png",
    // REMOVED: ctaText and ctaLink
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Concept:</strong> This website for Maake and Shores Funeral Catering Services was built using React.js and Tailwind CSS to create a compassionate and professional online presence for a company that provides dignified funeral catering across all 9 provinces of South Africa. The design focuses on empathy and clarity, featuring a clean hero section with clear calls-to-action, an introduction to the leadership team, and transparent pricing tables for their Silver, Gold, and Diamond catering packages. The site effectively balances emotional sensitivity with business functionality, making it easy for grieving families to quickly understand their options and request support during difficult times.
          </p>
          <p>
            <strong>Compassionate Branding & UI:</strong> 
            Designed with a sensitive tone, featuring a calming layout that introduces the team and company values to build immediate trust with families.
          </p>
          <p>
            <strong>Dynamic Pricing System:</strong> 
            Built with React components to display three clear catering packages (Silver R7,800, Gold R19,200, Diamond R28,000) with automated menu breakdowns for easy comparison.
        </p>
        <p>
        <strong>Fully Responsive & Accessible:</strong> 
            Developed with Tailwind CSS to ensure the website works flawlessly on all devices, allowing families across South Africa to access information anytime, anywhere..
        </p>
        </div>
      );
    },
  },
  {
    description: "Full-Stack Web",
    title: "INWOFU Studio",
    src: "/Inwofu.webp",
    // REMOVED: ctaText and ctaLink
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Project:</strong> A complete digital presence for a boutique interior design studio.
          </p>
          <p>
             <strong>Deployment:</strong> 
              Managed end-to-end deployment including database configuration (SQLite3) and static asset handling on cloud infrastructure.
          </p>
          <p>
             <strong>Features:</strong>
              Portfolio showcase, client testimonials, and service inquiry forms.
          </p>
        </div>
      );
    },
  },
  
];