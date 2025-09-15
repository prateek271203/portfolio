'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/section-wrapper';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PROJECTS_DATA } from '@/lib/data';
import { ExternalLink, Eye } from 'lucide-react';
import { ProjectModal } from './project-modal';
import type { Project } from './project-modal';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="projects" className="bg-background">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Featured Projects</h2>
        <p className="mt-4 text-lg text-muted-foreground">A selection of my recent work.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="h-full"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ rotateY: 5, rotateX: 5 }}
            >
              <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
                <CardHeader>
                  <div className="aspect-video relative">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={project.imageHint}
                    />
                  </div>
                  <CardTitle className="pt-4">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start">
                  {project.title === 'Axentrica - HR Consulting' || project.title === 'Digiidunia' ? (
                    <Button variant="outline" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setSelectedProject(project)}>
                      <Eye className="mr-2 h-4 w-4" /> View More
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionWrapper>
  );
}
