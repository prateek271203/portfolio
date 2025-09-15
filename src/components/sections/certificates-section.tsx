'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CERTIFICATES_DATA } from '@/lib/data';
import { ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export function CertificatesSection() {

  const cardVariants = {
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
    <SectionWrapper id="certificates" className="bg-card">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Certificates</h2>
        <p className="mt-4 text-lg text-muted-foreground">My professional certifications.</p>
      </div>
      <div className="mt-12 max-w-5xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {CERTIFICATES_DATA.map((certificate, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                 <motion.div
                  className="p-1 h-full"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                 >
                    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300 neumorphic-shadow-inset">
                      <CardHeader>
                        <div className="aspect-video relative">
                          <Image
                            src={certificate.image}
                            alt={certificate.title}
                            fill
                            className="object-contain rounded-t-lg p-2"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <CardTitle className="pt-4">{certificate.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription>Issued by {certificate.issuer}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" asChild>
                          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> View Credential
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                 </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </div>
    </SectionWrapper>
  );
}
