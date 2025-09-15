import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { TimelineSection } from '@/components/sections/timeline-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Assistant } from '@/components/assistant/assistant';
// import { CertificatesSection } from '@/components/sections/certificates-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <SkillsSection />
        <ProjectsSection />
        {/* <CertificatesSection /> */}
        <ContactSection />
      </main>
      <Assistant />
      <Footer />
    </div>
  );
}
