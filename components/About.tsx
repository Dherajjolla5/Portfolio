"use client";

import { PixelImage } from "@/components/ui/pixel-image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Zap } from "lucide-react";

export default function About() {
  const bioText = `With a strong foundation in web development, I create professional websites and applications that are scalable, secure, and visually engaging. My goal is to provide solutions that not only look great but also perform exceptionally well`;

  return (
    <section id="about" className="w-full bg-black py-12 text-white md:py-32">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        
        {/* LAYOUT: Forced Flex Row (Side-by-Side) */}
        <div className="flex flex-row items-center gap-6 md:gap-12 lg:gap-24">
          
          {/* LEFT SIDE: Image */}
          <div className="flex shrink-0 justify-center md:justify-end">
            <PixelImage
              src="/profile2.png"
              grid="8x8"
              pixelFadeInDuration={1200}
              colorRevealDelay={1500}
              grayscaleAnimation={true}
            />
          </div>

          {/* RIGHT SIDE: Narrative */}
          {/* Added 'justify-center' to vertically center text with image */}
          {/* Changed space-y to control distance between Header and Paragraph */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">
            
            {/* Header Section */}
            <div className="flex items-center gap-2 md:gap-4">
              <Zap className="size-6 text-purple-500 md:size-8 lg:size-10" />
              {/* RESPONSIVE HEADING:
                  - text-3xl (Mobile): Readable next to image
                  - sm:text-4xl (Small Tablet)
                  - md:text-5xl (Tablet/Laptop)
                  - lg:text-6xl (Desktop)
                  Removed min-h to prevent unnecessary gaps
              */}
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                ABOUT ME
              </h2>
            </div>

            {/* Paragraph Section */}
            <div className="min-h-[150px] md:min-h-[200px]">
              <TextGenerateEffect
                words={bioText}
                // RESPONSIVE BODY TEXT:
                // text-xs (Mobile): Fits tight layout
                // sm:text-sm (Small Tablet)
                // md:text-xl (Tablet/Laptop)
                // lg:text-2xl (Desktop)
                className="text-xs leading-relaxed text-gray-300 sm:text-sm md:text-xl lg:text-2xl"
                filter={true}
                duration={2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}