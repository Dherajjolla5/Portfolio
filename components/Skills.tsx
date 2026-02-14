import React from "react";
import { GlareCard } from "./ui/glare-card";
import { 
  SiPython, SiDjango, SiReact, SiTailwindcss, 
  SiRaspberrypi, SiArduino, 
  SiHuggingface, SiPytorch, SiCplusplus,
  SiLeetcode, SiMysql, SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiWordpress,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiClickhouse,
  SiClickup,
  SiSlack,
  SiJira
} from "react-icons/si";
import { FaMicrochip, FaRobot, FaJava } from "react-icons/fa6";

export function SkillsSection() {
  const skills = [
    {
      title: "Backend",
      description: "Server Side Development",
      icons: [
        { icon: SiNodedotjs, name: "Node.js" },
        { icon: SiExpress, name: "Express.js" },
        { icon: SiMongodb, name: "Mongo DB" },
      ],
    },
    {
      title: "Frontend",
      description: "UI / UX",
      icons: [
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiReact, name: "React" },
        { icon: SiTailwindcss, name: "Tailwind CSS" },
      ],
    },
    {
      title: "Management Software",
      description: "Client Communication",
      icons: [
        { icon: SiClickup, name: "ClickUp" },
        { icon: SiSlack, name: "Slack" },
        { icon: SiJira, name: "Jira" },
      ],
    },

  ];

  return (
    <section className="py-20 bg-black" id="skills">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">
          Technical Arsenal
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 justify-items-center w-full">
          {skills.map((skill, index) => (
            <GlareCard 
              key={index} 
              className="w-full aspect-[17/24] md:aspect-[17/21]"
            >
              <div className="flex flex-col h-full justify-center items-center w-full z-10 relative py-4 px-2 md:py-8 md:px-6">
                
                <div className="text-center">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2 tracking-wide leading-tight">
                    {skill.title}
                  </h3>
                  <p className="text-[10px] md:text-sm text-slate-400 font-medium leading-tight">
                    {skill.description}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-4 md:my-6 w-full">
                  {skill.icons.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 md:gap-2 group">
                      <item.icon className="w-6 h-6 md:w-10 md:h-10 text-white group-hover:text-cyan-400 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                      <span className="text-[9px] md:text-xs text-slate-300 font-mono text-center">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-8 md:w-16 h-0.5 md:h-1 bg-slate-700 rounded-full opacity-50" />
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  );
}