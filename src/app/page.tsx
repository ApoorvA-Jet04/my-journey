"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    id: "section-1",
    title: "The Redirection.",
    content: "Plan A was medical school. But after NEET, I realized my real interest was building things."
  },
  {
    id: "section-2",
    title: "Hello, World.",
    content: "I chose engineering out of necessity to build, not a burning passion for code."
  },
  {
    id: "section-3",
    title: "Trial by Fire.",
    content: "My first build was a Food Spoilage Detector for a compulsory class. The market fit was questionable, but the effort was real."
  },
  {
    id: "section-4",
    title: "Learning in Public.",
    content: "Currently in my 2nd semester of Information Science and Engineering at BMSIT&M. I use AI to help me build, but my current mission is learning how the underlying architecture actually works."
  },
  {
    id: "section-5",
    title: "The Agentic Future.",
    content: "My ultimate goal is building Generative AI and Agentic systems. I am putting in the reps now to build the intelligent systems of tomorrow."
  }
];

function SectionItem({ section, containerRef, index, total }: { section: typeof sections[0], containerRef: React.RefObject<HTMLElement>, index: number, total: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  // fade in when scrolling into view, fully visible at center (0.5), fade out when scrolling out
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center px-6 md:px-16 lg:px-32 snap-center relative z-10"
    >
      <motion.div 
        style={{ opacity, y, scale }}
        className="max-w-7xl mx-auto text-center drop-shadow-2xl"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter mb-8 text-white leading-none py-2 drop-shadow-lg">
          {section.title}
        </h1>
        <p className="text-lg md:text-3xl lg:text-4xl font-medium leading-relaxed md:leading-snug text-neutral-300 max-w-5xl mx-auto text-balance drop-shadow-lg">
          {section.content}
        </p>
      </motion.div>

      {/* Scroll Indicator for all but last section */}
      {index < total - 1 && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className="text-neutral-500 text-xs font-semibold uppercase tracking-widest drop-shadow-md">Scroll</span>
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-neutral-400 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track global scroll of the container to crossfade the background images
  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  const startOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const endOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main ref={containerRef} className="bg-transparent text-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative z-10">
      
      {/* Background Images fixed to viewport center */}
      <motion.img 
        src="https://i.ibb.co/4Z8BJpNm/start.png" 
        alt="Start Image"
        className="animate-spin-centered"
        style={{ 
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          zIndex: 0,
          opacity: startOpacity 
        }}
      />
      <motion.img 
        src="https://i.ibb.co/tFjCxx5/end.png" 
        alt="End Image"
        className="animate-spin-centered"
        style={{ 
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          zIndex: 0,
          opacity: endOpacity 
        }}
      />
      
      {/* Subtle overlay glow to ensure text remains readable if images are bright */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      {sections.map((section, index) => (
        <SectionItem 
          key={section.id} 
          section={section} 
          containerRef={containerRef} 
          index={index} 
          total={sections.length} 
        />
      ))}
    </main>
  );
}
