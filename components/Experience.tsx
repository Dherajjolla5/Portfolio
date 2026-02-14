"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Calculate the height of the SVG beam based on scroll
  const contentHeight = useTransform(scrollYProgress, [0, 0.8], [0, 1000]); // Adjust 1000 based on content length estimate or calculate dynamically

  return (
    <div id="experience" className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-12 text-center">
          Professional Journey
        </h2>
        
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
          {/* --- The Tracing Beam Container --- */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] h-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
             <motion.div
              style={{ height: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 500, damping: 90 }) }}
              className="absolute top-0 w-full bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent"
             />
          </div>

          {/* --- Experience Nodes --- */}
          <div className="space-y-12 pl-12 md:pl-20 pt-4">
            {experiences.map((item, index) => (
              <ExperienceCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ExperienceCard = ({
  item,
  index,
}: {
  item: (typeof experiences)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Dot on the timeline */}
      <div className="absolute -left-[35px] md:-left-[51px] top-6 h-4 w-4 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300 z-10" />

      <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300 backdrop-blur-sm">
        
        {/* Date & Role Mobile */}
        <div className="md:w-1/4 flex flex-col justify-between shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {item.date}
            </span>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mt-1">
              {item.company}
            </h3>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {item.location}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            {item.title}
          </h4>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-950"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const experiences = [
  {
    title: "Solo Developer",
    company: "averything.co.za",
    date: "2026 - Present",
    location: "South Africa (Remote)",
    description:
      "Leading the technical division of the Institution's Innovation Council. Spearheading the development of the official committee website from scratch using modern web technologies. Managing a team of developers to digitize event registrations and innovation showcases.",
    skills: ["React.js", "Next.js", "UI/UX Architecture", "Web Performance"],
  },
  {
    title: "Senior Team Leader",
    company: "Carpediem",
    date: "2025",
    location: "Karachi pakistan (Remote)",
    description:
      "Directing the digital strategy and web infrastructure for the consulting group. Developing a content-heavy platform to display case studies, student consultant portfolios, and industry analysis reports.",
    skills: ["CRM", "CMS", "UI/UX Architecture", "Web Performance" , "Custom website development"],
  },
  {
    title: "Senior Developer In B2B Department",
    company: "ABtech Solutions",
    date: "2023",
    location: "Karachi pakistan",
    description:
      "Architected and deployed a comprehensive portfolio website for an interior design studio. Built a custom Django backend to manage project galleries and client inquiries, coupled with a responsive frontend.",
    skills: ["Shopify Liquid", "B2B Websites Development", "Server Integration", "Figma to shopify"],
  },
  {
    title: "Senior Developer",
    company: "Viral Ads",
    date: "2021",
    location: "Karachi Pakistan",
    description:
      "Developed 'DebugAI', an AI-powered online IDE using the Hugging Face API. Engineered 'FOMO Fruit Detection', a real-time computer vision system running on ESP32-CAM hardware using Edge Impulse.",
    skills: ["CMS Custom Websites", "Server Integration", "Client Communication", "Figma to Custom Website"],
  },
];