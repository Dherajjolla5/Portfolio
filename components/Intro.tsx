"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { MorphingText } from "@/components/ui/morphing-text";
import { Cpu, Wifi, Gauge, Server, Clock } from "lucide-react";
import { SiTailwindcss } from "react-icons/si";
import { DiJavascript } from "react-icons/di";

interface IntroProps {
  children: React.ReactNode;
}

export default function Intro({ children }: IntroProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Define the intro items here internally
  const items: ReactNode[] = [
    <div key="react" className="flex items-center gap-3">
      <DiJavascript size={42} /> React.js
    </div>,
    <div key="ai" className="flex items-center gap-3">
      <SiTailwindcss size={42} /> Talwind CSS
    </div>,
    <div key="hps" className="flex items-center gap-3">
      <Clock size={42} /> High-Performance Websites
    </div>,
    <div key="title" className="text-5xl">
      <Server size={42} /> Node / Express
    </div>,
  ];

  // Each morph cycle = 2s (1.5 morph + 0.5 cooldown)
  const totalDuration = items.length * 2000;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), totalDuration - 500);
    const hideTimer = setTimeout(() => setShowIntro(false), totalDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [totalDuration]);

  return (
    <div className="relative w-full">
      {/* INTRO OVERLAY */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <MorphingText items={items} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div
        className={`transition-opacity duration-700 ${
          showIntro ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}