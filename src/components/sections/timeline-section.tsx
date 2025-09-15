'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/section-wrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TIMELINE_DATA } from '@/lib/data';

export function TimelineSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper id="journey" className="bg-background">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">My Journey</h2>
        <p className="mt-4 text-lg text-muted-foreground">A timeline of my career and education.</p>
      </div>
      <div className="relative mt-12">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20" aria-hidden="true" />
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {TIMELINE_DATA.map((item, index) => (
            <motion.div key={index} className="relative flex items-center" variants={itemVariants}>
              <div className="hidden md:flex w-1/2 pr-8 justify-end">
                {index % 2 === 0 && <TimelineCard {...item} />}
              </div>
              <div className="hidden md:flex w-1/2 pl-8 justify-start">
                {index % 2 !== 0 && <TimelineCard {...item} />}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2">
                <div className="h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="absolute inset-0 h-8 w-8 rounded-full bg-primary/50 blur-md animate-pulse" />
              </div>
              <div className="md:hidden w-full pl-12">
                <TimelineCard {...item} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function TimelineCard(item: (typeof TIMELINE_DATA)[number]) {
  return (
    <Card className="max-w-md w-full neumorphic-shadow-inset bg-background/50 hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 transform backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-primary">{item.title}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{item.company}</CardDescription>
          </div>
          <span className="text-xs font-semibold text-primary px-2 py-1 rounded-full bg-primary/10 border border-primary/30 whitespace-nowrap">{item.date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}
