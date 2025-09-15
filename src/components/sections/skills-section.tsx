'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { SKILLS_DATA } from '@/lib/data';

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <SectionWrapper id="skills" className="bg-card">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Technical Skills</h2>
        <p className="mt-4 text-lg text-muted-foreground">My expertise across the tech stack.</p>
      </div>
      <div className="mt-12 max-w-4xl mx-auto">
        <Tabs defaultValue={SKILLS_DATA[0].category} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {SKILLS_DATA.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {SKILLS_DATA.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-8">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <Card className="text-center p-4 flex flex-col items-center justify-center aspect-square transition-all duration-300 bg-background/50 hover:bg-background neumorphic-shadow-inset relative overflow-hidden">
                      <AnimatePresence>
                        {hoveredSkill !== skill.name && (
                          <motion.div
                            initial={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="p-0 flex flex-col items-center gap-3"
                          >
                            <skill.icon className="h-10 w-10 text-primary" />
                            <p className="font-semibold text-sm sm:text-base">{skill.name}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {hoveredSkill === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 p-4 flex flex-col items-center justify-center gap-3"
                          >
                            <p className="font-bold text-lg text-primary">{skill.proficiency}%</p>
                            <Progress value={skill.proficiency} className="h-2 w-[80%]" />
                            <p className="font-semibold text-sm sm:text-base">{skill.name}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SectionWrapper>
  );
}
