'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { X } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  images: string[];
  liveUrl: string;
  imageHint: string;
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
    scale: 0.5,
    rotateX: -90,
  },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    scale: 0.5,
    rotateX: 90,
  },
};


export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog open={!!project} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <AnimatePresence>
            {project && (
                <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-4xl w-full">
                    <motion.div
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative bg-card rounded-lg shadow-2xl overflow-hidden neumorphic-shadow"
                    >
                        <Carousel className="w-full">
                            <CarouselContent>
                            {project.images.map((img, index) => (
                                <CarouselItem key={index}>
                                <div className="aspect-video relative">
                                    <Image src={img} alt={`${project.title} screenshot ${index + 1}`} fill className="object-cover" data-ai-hint={project.imageHint} />
                                </div>
                                </CarouselItem>
                            ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
                            <p className="mt-2 text-muted-foreground">{project.description}</p>
                        </div>
                        <button onClick={onClose} className="absolute top-4 right-4 text-primary-foreground bg-primary/50 rounded-full p-2 hover:bg-primary/80 transition-colors z-20">
                            <X className="h-6 w-6"/>
                        </button>
                    </motion.div>
                </DialogContent>
            )}
        </AnimatePresence>
    </Dialog>
  );
}
