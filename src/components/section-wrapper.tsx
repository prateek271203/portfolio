import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24', className)}>
      {children}
    </section>
  );
}
