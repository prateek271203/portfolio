
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SKILLS_DATA } from '@/lib/data';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: string;
  animationDuration: string;
}

const allSkills = SKILLS_DATA.flatMap((category) => category.skills.map(skill => skill.name));
const TITLES = ['Full Stack Developer', 'Web Developer', 'Mern Stack Developer'];

export function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({});
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);

    const newParticles = Array.from({ length: 50 }).map((_, i) => { // Reduced particle count
        const size = Math.random() * 1.5 + 1;
        return {
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: size,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`, // Slightly longer duration
        };
    });
    setParticles(newParticles);
    
    const shuffledSkills = [...allSkills].sort(() => 0.5 - Math.random());
    setAnimatedSkills(shuffledSkills.slice(0, 6)); // Reduced floating skills

    const interval = setInterval(() => {
        setTitleIndex((prevIndex) => (prevIndex + 1) % TITLES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!containerRef.current || window.innerWidth < 768) return; // Disable on mobile

    requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        setSpotlightStyle({
          background: `radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        });
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (isClient && container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('touchmove', handleMouseMove, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleMouseMove);
      }
    };
  }, [handleMouseMove, isClient]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  const skillAnimationVariants = {
    initial: (i: number) => ({
      opacity: 0,
      y: '100vh',
      x: i % 2 === 0 ? -50 : 50,
      rotate: i % 2 === 0 ? -10 : 10,
    }),
    animate: (i: number) => ({
      opacity: [0, 0.7, 0.7, 0],
      y: '-100vh',
      x: i % 2 === 0 ? -100 : 100,
      rotate: 0,
      transition: {
        duration: 10 + Math.random() * 5,
        delay: i * (Math.random() * 2 + 1),
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    }),
  };

  return (
    <section ref={containerRef} className="relative flex h-[calc(100vh-5rem)] min-h-[700px] w-full items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px transition-all duration-300" 
        style={spotlightStyle} 
      />
      
      {/* Particle Animation */}
      <div className="particle-container">
        {isClient && particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Floating Tech Names */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {isClient && animatedSkills.map((skill, index) => (
          <motion.div
            key={skill}
            custom={index}
            variants={skillAnimationVariants}
            initial="initial"
            animate="animate"
            className="absolute text-primary font-code text-sm py-1 px-3 bg-primary/10 border border-primary/30 rounded-full whitespace-nowrap"
            style={{
                left: `${10 + (index % 4) * 20 + (index < 4 ? 0 : 5)}%`
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-20 text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl md:text-7xl font-bold font-headline text-primary" variants={itemVariants}>
          Prateek Kumar
        </motion.h1>

        <motion.div variants={itemVariants} className="mt-4 text-2xl md:text-4xl font-semibold text-primary h-12">
            <AnimatePresence mode="wait">
                <motion.h2
                    key={TITLES[titleIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                >
                    {TITLES[titleIndex]}
                </motion.h2>
            </AnimatePresence>
        </motion.div>

        <motion.p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground" variants={itemVariants}>
          Crafting futuristic, user-centric web experiences with a passion for clean code and intelligent design.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#projects">
              View My Work <ArrowDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/presume.pdf" download>
                Download CV <Download className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
