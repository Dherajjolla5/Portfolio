import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Code, Database, Globe, Server, Smartphone, Zap } from "lucide-react";
import TextType from "./ui/TextType"; 
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] w-full items-center overflow-hidden bg-black text-white">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <DottedGlowBackground
          className="h-full w-full pointer-events-none opacity-80"
          opacity={1}
          gap={10}
          radius={1.6}
          colorLightVar="#d4d4d8"
          glowColorLightVar="#d4d4d8"
          colorDarkVar="#d4d4d8"
          glowColorDarkVar="#38bdf8"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />
      </div>

      {/* LEFT SIDE: Content (70%) */}
      <div className="relative z-10 flex h-full w-[70%] flex-col justify-center pl-6 md:pl-16 lg:pl-24">
        
        <div className="space-y-2 md:space-y-6">
          
          <div className="inline-flex items-center rounded-full border border-purple-900/40 bg-purple-900/10 px-3 py-1 text-sm font-medium text-purple-300">
            <span className="mr-2 flex size-2 rounded-full bg-green-500"></span>
            Open to Work
          </div>

          <h1 className="mb-1 min-h-[60px] text-4xl font-bold leading-none tracking-tighter text-white sm:min-h-[120px] sm:text-5xl md:text-6xl lg:text-7xl">
            <TextType
              text={[
                "Hello!",
                "I'm Dheraj jolla",
                "I Develop web apps , AI systems",
              ]}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>

          <div className="flex max-w-[700px] flex-col gap-2">
            <p className="text-xl font-medium text-white md:text-2xl">
              Software Developer Specializing In Responsive, User-Friendly, and Scalable Web Solutions.
            </p>
            
            <p className="text-sm text-muted-foreground md:text-base">
              Express <span className="mx-2 text-purple-500">|</span> 
              React.js <span className="mx-2 text-purple-500">|</span> 
              Next.js <span className="mx-2 text-purple-500">|</span> 
              Full-Stack Developer
            </p>
          </div>

          {/* BUTTONS SECTION */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              View Projects
            </a>
            <a 
              href="Dheraj jolla.pdf" 
              download="public/Dheraj jolla.pdf"
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Animation (30%) */}
      {/* 'pointer-events-none' ensures smooth scrolling on mobile */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 flex h-full w-[30%] items-center justify-center">
        
        {/* UPDATED: Added scaling classes for PC View: 
            md:scale-110 (10% bigger on laptop)
            lg:scale-125 (25% bigger on desktop)
            xl:scale-150 (50% bigger on large screens)
        */}
        <div className="relative flex size-full max-w-lg items-center justify-center md:scale-110 lg:scale-125 xl:scale-150">
          
          <div className="z-10 flex size-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md shadow-xl md:size-16">
            <Zap className="size-6 text-yellow-500 fill-yellow-500 md:size-8" />
          </div>

          <OrbitingCircles
            className="border-none bg-transparent"
            duration={20}
            delay={20}
            radius={80}
            iconSize={30}
          >
            <Code className="text-blue-500" />
            <Database className="text-blue-500" />
            <Server className="text-blue-500" />
          </OrbitingCircles>

          <OrbitingCircles
            className="border-none bg-transparent"
            duration={20}
            delay={10}
            radius={130}
            reverse
            iconSize={40}
          >
            <Globe className="text-purple-500" />
            <Smartphone className="text-purple-500" />
          </OrbitingCircles>
        </div>
      </div>
    </section>
  );
}