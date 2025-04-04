import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'default' | 'gradient';
}

const AnimatedBackground = ({ className, variant = 'default' }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0", className)}>
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-small-black/[0.02]" />
      
      {/* Animated particles */}
      <div className="fixed h-4 w-4 rounded-full bg-primary/20 top-1/4 left-1/4 animate-ping [animation-duration:6s]" />
      <div className="fixed h-3 w-3 rounded-full bg-primary/20 top-3/4 left-1/3 animate-ping [animation-duration:8s] [animation-delay:1s]" />
      <div className="fixed h-5 w-5 rounded-full bg-primary/20 top-1/2 left-3/4 animate-ping [animation-duration:7s] [animation-delay:2s]" />
      <div className="fixed h-3 w-3 rounded-full bg-primary/20 top-1/3 right-1/4 animate-ping [animation-duration:9s] [animation-delay:3s]" />
      <div className="fixed h-4 w-4 rounded-full bg-primary/20 bottom-1/4 right-1/3 animate-ping [animation-duration:5s] [animation-delay:1.5s]" />
      
      {/* Floating elements */}
      <div className="fixed top-1/4 right-1/4 w-8 h-8 rounded-lg bg-secondary/30 animate-float [animation-duration:4s]" />
      <div className="fixed bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-primary/20 animate-float [animation-duration:5s] [animation-delay:1s]" />
      <div className="fixed top-1/2 right-1/3 w-10 h-10 rounded-lg bg-secondary/20 animate-float [animation-duration:6s] [animation-delay:2s]" />
      
      {/* Gradient overlay */}
      {variant === 'gradient' && (
        <div className="fixed inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />
      )}
    </div>
  );
};

export default AnimatedBackground; 