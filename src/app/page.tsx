/* eslint-disable */
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const sections = [
  {
    id: "section-0",
    title: "HELLO.",
    content: "I'm Apoorva, a 2nd-semester Computer Science student at BMSIT&M. I don't just prompt AI; I’m a student of architecture, reverse-engineering how the underlying systems work."
  },
  {
    id: "section-1",
    title: "The Redirection.",
    content: "Plan A was medical school. But after NEET, I realized my real interest was building things."
  },
  {
    id: "section-2",
    title: 'print("Hello world")',
    content: "I chose engineering out of necessity to build, not a burning passion for code."
  },
  {
    id: "section-3",
    title: "Trial by Fire.",
    content: "My first build was a Food Spoilage Detector for IDT. The market fit was questionable, but the effort was real."
  },
  {
    id: "section-4",
    title: "Learning in Public.",
    content: "Currently in my 2nd semester of Computer Science and Engineering at BMSIT&M. I use AI to help me build, but my current mission is learning how the underlying architecture actually works."
  },
  {
    id: "section-5",
    title: "The Agentic Future.",
    content: "My ultimate goal is building Generative AI and Agentic systems. I am putting in the reps now to build the intelligent systems of tomorrow."
  }
];

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((char, index) => {
            if(char === " ") return " ";
            if(index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      );
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <motion.span
      onViewportEnter={scramble}
      viewport={{ once: false, amount: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

const StaggerText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <motion.span 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {}
      }}
      className="inline-block"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

function SectionItem({ section, index, total, setHovered, setIsLastSection }: { section: typeof sections[0], index: number, total: number, setHovered: (val: boolean) => void, setIsLastSection: (val: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  const renderSticker = () => {
    if (section.id === "section-1") {
      return (
        <motion.div 
          className="absolute left-[2%] md:left-[10%] top-1/3 text-white/10 pointer-events-none hidden md:block"
          animate={{ y: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
            <circle cx="20" cy="10" r="2"/>
          </svg>
        </motion.div>
      );
    }
    if (section.id === "section-5") {
      return (
        <motion.div 
          className="absolute right-[2%] md:right-[10%] top-1/4 text-white/10 pointer-events-none hidden md:block"
          animate={{ y: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        >
          <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
          </svg>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center px-6 md:px-16 lg:px-32 snap-center relative z-20"
      onViewportEnter={() => { if (section.id === "section-5") setIsLastSection(true); }}
      onViewportLeave={() => { if (section.id === "section-5") setIsLastSection(false); }}
      viewport={{ amount: 0.3 }}
    >
      {renderSticker()}
      <div 
        className="max-w-7xl mx-auto text-center drop-shadow-2xl"
      >
        <h1 
          className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter mb-8 text-white leading-none py-2 drop-shadow-lg cursor-default"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <ScrambleText text={section.title} />
        </h1>
        <p className="text-lg md:text-3xl lg:text-4xl font-medium leading-relaxed md:leading-snug text-neutral-300 max-w-5xl mx-auto text-balance drop-shadow-lg">
          <StaggerText text={section.content} />
        </p>
      </div>

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
    </motion.section>
  );
}

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLastSection, setIsLastSection] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);
  
  return (
    <>
    <main className="bg-transparent text-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative z-10">
      
      {/* Sleek Fixed Top Navigation */}
      <header className="fixed top-0 left-0 w-full px-8 py-6 z-50 flex items-center justify-between pointer-events-none">
        <div className="text-sm md:text-base font-bold tracking-widest text-white drop-shadow-md">
          APOORVA.
        </div>
        <div className="text-sm md:text-base font-light tracking-wide text-white/80 drop-shadow-sm">
          Timeline Journey | CSE
        </div>
      </header>

      {/* Background Images fixed to viewport center */}
      <motion.img 
        src="https://i.ibb.co/Z6jw0KVj/end.png" 
        alt="Start Image"
        className="animate-spin-centered pointer-events-none"
        animate={{ opacity: isLastSection ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ 
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          zIndex: -10
        }}
      />

      <motion.img 
        src="https://i.ibb.co/HD4XZDy6/start.png" 
        alt="End Image"
        className="animate-spin-centered pointer-events-none"
        animate={{ opacity: isLastSection ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ 
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          zIndex: -10
        }}
      />
      
      {/* Hand-Drawn Scribbles & Twinkling Stars */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Parallax Scribble Circles rotating at 60s vs 40s for depth */}
        <svg 
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[800px] max-h-[800px] text-white/20 animate-spin-centered"
          style={{ animationDuration: '60s' }}
          viewBox="0 0 200 200" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        >
          <path d="M100,10 C140,12 185,45 190,100 C195,150 160,185 100,190 C45,195 12,160 10,100 C8,45 45,15 100,10 Z" />
          <path d="M100,20 C150,15 180,60 175,100 C170,160 140,175 100,180 C50,185 20,150 25,100 C30,50 60,25 100,20 Z" />
          <path d="M100,5 C160,10 195,50 195,100 C195,160 150,195 100,195 C40,195 5,150 5,100 C5,40 50,5 100,5 Z" />
        </svg>

        {/* Twinkling Sparkle Stars */}
        <svg className="absolute top-[15%] left-[20%] w-6 h-6 text-white/60 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
        <svg className="absolute bottom-[20%] right-[15%] w-8 h-8 text-white/40 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
        <svg className="absolute top-[25%] right-[25%] w-4 h-4 text-white/80 animate-pulse" style={{ animationDelay: '1.2s', animationDuration: '1.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
        <svg className="absolute bottom-[30%] left-[25%] w-5 h-5 text-white/50 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
        <svg className="absolute top-[45%] left-[10%] w-3 h-3 text-white/70 animate-pulse" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
        <svg className="absolute top-[60%] right-[10%] w-7 h-7 text-white/30 animate-pulse" style={{ animationDelay: '1.7s', animationDuration: '3.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
      </div>
      
      {/* Subtle overlay glow to ensure text remains readable if images are bright */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      {sections.map((section, index) => (
        <SectionItem 
          key={section.id} 
          section={section} 
          index={index} 
          total={sections.length} 
          setHovered={setIsHovered}
          setIsLastSection={setIsLastSection}
        />
      ))}
    </main>
    
    {/* Custom Framer Motion Cursor */}
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[999] flex items-center justify-center mix-blend-screen hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div 
        className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        animate={{ 
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 0.8 : 1,
          rotate: isHovered ? 90 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.div>
    </motion.div>
    </>
  );
}
