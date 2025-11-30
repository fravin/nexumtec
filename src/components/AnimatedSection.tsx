import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'fadeIn';
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimatedSection = ({ 
  children, 
  animation = 'slideUp',
  delay = 0,
  duration = 600,
  className 
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    slideUp: 'animate-slide-up',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right',
    scaleIn: 'animate-scale-in',
    fadeIn: 'animate-fade-in'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
};
