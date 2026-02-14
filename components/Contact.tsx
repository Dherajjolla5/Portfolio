"use client";
import React, { useRef } from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

// Top Layer: Random junk to drag away
const distractions = [
  {
    id: 1,
    title: "Aspiration #404",
    content: "I want to code, but I also want to sleep for 3 years straight.",
    color: "bg-yellow-100 dark:bg-yellow-900",
    rotate: "6deg",
  },
  {
    id: 2,
    title: "Bad Joke",
    content: "Why do Java developers wear glasses? Because they don't C#.",
    color: "bg-blue-100 dark:bg-blue-900",
    rotate: "-5deg",
  },
  {
    id: 3,
    title: "Philosophy",
    content: "If it works on localhost, it's basically production ready.",
    color: "bg-green-100 dark:bg-green-900",
    rotate: "3deg",
  },
  {
    id: 4,
    title: "To-Do List",
    content: "1. Fix bugs.\n2. Create more bugs.\n3. Cry.",
    color: "bg-purple-100 dark:bg-purple-900",
    rotate: "-8deg",
  },
  {
    id: 5,
    title: "Motivation",
    content: "You are the CSS to my HTML. Without you, I'm just structureless content.",
    color: "bg-red-100 dark:bg-red-900",
    rotate: "2deg",
  },
];

// Bottom Layer: Actual contact links
const contacts = [
  {
    id: 101,
    name: "GitHub",
    url: "https://github.com/Dherajjolla5",
    icon: <Github className="h-12 w-12 mb-4" />,
    color: "bg-neutral-200 dark:bg-neutral-800",
    rotate: "-2deg",
  },
  {
    id: 102,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dheraj-jolla/",
    icon: <Linkedin className="h-12 w-12 mb-4" />,
    color: "bg-blue-200 dark:bg-blue-950",
    rotate: "4deg",
  },
  {
    id: 103,
    name: "Email Me",
    url: "mailto:dherajjolla@outlook.com",
    icon: <Mail className="h-12 w-12 mb-4" />,
    color: "bg-emerald-200 dark:bg-emerald-950",
    rotate: "-1deg",
  },
  {
    id: 104,
    name: "Instagram",
    url: "https://www.instagram.com/dherajjolla5",
    icon: <Instagram className="h-12 w-12 mb-4" />,
    color: "bg-pink-200 dark:bg-pink-950",
    rotate: "3deg",
  },
];

export default function ChaoticContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="contact" className="relative h-screen w-full bg-neutral-50 dark:bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Text - Moved higher (top-8) */}
      <div className="absolute top-8 text-center z-0 pointer-events-none select-none">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-5 text-center">
          Get in Touch
        </h2>
        <p className="text-neutral-500 mt-2">
          (If you can find the details...)
        </p>
      </div>

      {/* Physics Container: Added pt-40 to push the center stack down */}
      <DraggableCardContainer 
        containerRef={containerRef}
        className="relative h-full w-full flex items-center justify-center pt-40"
      >
        {/* CONTACT CARDS (Bottom Layer - Low Z-Index) */}
        {contacts.map((contact, index) => (
          <DraggableCardBody
            key={contact.id}
            containerRef={containerRef}
            initialRotate={contact.rotate}
            zIndex={index} 
            className={`${contact.color} border border-neutral-200 dark:border-neutral-700`}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              {contact.icon}
              <h3 className="text-2xl font-bold mb-2">{contact.name}</h3>
              <a
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                // Stop propagation allows clicking the link without triggering drag immediately
                onPointerDown={(e) => e.stopPropagation()}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer z-50 relative"
              >
                Connect
              </a>
            </div>
          </DraggableCardBody>
        ))}

        {/* DISTRACTION CARDS (Top Layer - High Z-Index) */}
        {distractions.map((card, index) => (
          <DraggableCardBody
            key={card.id}
            containerRef={containerRef}
            initialRotate={card.rotate}
            zIndex={50 + index} // Start higher so they cover contacts
            className={`${card.color} shadow-xl border-2 border-black/5`}
          >
            <div className="flex flex-col h-full justify-between select-none pointer-events-none">
              <h3 className="text-xl font-bold opacity-50 uppercase tracking-widest">
                {card.title}
              </h3>
              <p className="text-3xl font-serif leading-tight text-neutral-800 dark:text-neutral-100">
                {card.content}
              </p>
              <div className="text-xs text-right opacity-30">
                Drag me away...
              </div>
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </div>
  );
}