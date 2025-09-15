'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { FREELANCE_SERVICES_DATA } from '@/lib/data';
import { QuoteModal } from '@/components/sections/quote-modal';

export default function FreelanceServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleGetQuoteClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Button variant="outline" asChild className="mb-8">
              <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
              </Link>
          </Button>
          <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Freelance Services</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  Providing high-quality solutions for web, mobile, and digital marketing. Let's build something amazing together.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {FREELANCE_SERVICES_DATA.map((service) => (
                  <Card key={service.title} className="flex flex-col neumorphic-shadow hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 transform hover:scale-105">
                      <CardHeader className="text-center">
                          <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                          <CardTitle className="text-2xl">{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <p className="text-4xl font-bold text-center mb-6">
                              ${service.startingPrice}
                              <span className="text-lg font-normal text-muted-foreground">/ starting</span>
                          </p>
                          <ul className="space-y-3">
                              {service.features.map((feature) => (
                                  <li key={feature} className="flex items-start">
                                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                      <span className="text-muted-foreground">{feature}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                      <CardFooter>
                          <Button className="w-full" onClick={() => handleGetQuoteClick(service.title)}>
                              Get a Quote
                          </Button>
                      </CardFooter>
                  </Card>
              ))}
          </div>
        </main>
        <Footer />
      </div>
      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </>
  );
}
