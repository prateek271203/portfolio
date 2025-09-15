import Image from 'next/image';
import { SectionWrapper } from '@/components/section-wrapper';

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-1 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden neumorphic-shadow">
            <Image
              src="/prateek.jpg"
              alt="Prateek Kumar"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="md:col-span-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            I'm a passionate Full Stack Developer with a knack for creating dynamic, user-friendly web applications. With a strong foundation in both front-end and back-end technologies, I specialize in building robust and scalable solutions.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            My journey in tech is driven by a curiosity for innovation and a desire to solve real-world problems. I enjoy working with modern frameworks and I am always eager to learn new things and take on new challenges.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
