"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // MOBILE: Compact padding (pt-8 pb-6)
    // DESKTOP: Spacious padding (md:pt-20 md:pb-10) - UNCHANGED
    <footer className="relative w-full bg-black text-white pt-8 pb-6 md:pt-20 md:pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* MOBILE: Tighter layout (gap-6 mb-8) */}
        {/* DESKTOP: Spacious layout (md:gap-12 md:mb-20) - UNCHANGED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-20">
          
          {/* Column 1: Brand/Identity */}
          {/* MOBILE: Tighter spacing (space-y-2) */}
          <div className="flex flex-col space-y-2 md:space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Dheraj jolla</h3>
            <p className="text-neutral-400 max-w-xs text-xs md:text-sm leading-relaxed">
              I help businesses establish a strong online presence by building modern, fast, and reliable websites.
            </p>
            <div className="text-neutral-500 text-[10px] md:text-xs mt-1 md:mt-4">
              Based in Karachi Pakistan
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="flex flex-col space-y-2 md:space-y-4">
            <h4 className="text-neutral-500 text-xs uppercase tracking-widest font-semibold">
              Sitemap
            </h4>
            {/* MOBILE: 2-column grid, tight gap, small text */}
            {/* DESKTOP: 1-column list, standard spacing - UNCHANGED */}
            <ul className="grid grid-cols-2 gap-y-1 gap-x-4 md:block md:space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/#about" },
                { name: "Projects", href: "/#projects" },
                { name: "Experience", href: "/#experience" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors w-fit text-xs md:text-base"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col space-y-2 md:space-y-4">
            <h4 className="text-neutral-500 text-xs uppercase tracking-widest font-semibold">
              Socials (If you didn't see the contact section)
            </h4>
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <SocialLink
                href="https://github.com/Dherajjolla5"
                icon={<Github className="w-4 h-4 md:w-5 md:h-5" />}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/dheraj-jolla/"
                icon={<Linkedin className="w-4 h-4 md:w-5 md:h-5" />}
                label="LinkedIn"
              />
              <SocialLink
                href="mailto:dherajjolla@outlook.com"
                icon={<Mail className="w-4 h-4 md:w-5 md:h-5" />}
                label="Email"
              />
              <SocialLink
                href="https://www.instagram.com/dherajjolla/"
                icon={<Instagram className="w-4 h-4 md:w-5 md:h-5" />}
                label="Instagram"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="border-t border-neutral-800 pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
          <div className="text-neutral-500 text-[10px] md:text-xs">
            &copy; {currentYear} Dheraj jolla. All rights reserved.
          </div>

          <div className="text-neutral-500 text-[10px] md:text-xs flex gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>

      {/* Background Text - UNCHANGED */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[15vw] leading-[0.8] font-black text-center whitespace-nowrap text-white">
          Dheraj jolla
        </h1>
      </div>
    </footer>
  );
}

// Helper Component for Social Icons
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    // Compact padding on mobile
    className="bg-neutral-900 p-2 md:p-3 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800"
  >
    {icon}
  </motion.a>
);