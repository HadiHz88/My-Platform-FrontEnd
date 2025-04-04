import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn(
      "relative overflow-hidden py-16 md:py-24",
      className
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground mb-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary mr-2"></span>
                Portfolio & Education Hub
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Projects, Courses & Educational Resources
            </h1>
            
            <p className="max-w-[500px] text-base md:text-lg text-muted-foreground text-balance">
              A curated collection of my work, university courses, and in-depth programming knowledge in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/projects" 
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                Browse Projects
                <ArrowRight className="ml-2 h-4 w-4 animate-[pulse_2s_ease-in-out_infinite]" />
              </Link>
              
              <Link 
                to="/courses" 
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                Explore Courses
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-in [animation-delay:200ms] hidden md:block">
            <div className="relative rounded-lg overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-400/20 mix-blend-multiply" />
              <img 
                src="/placeholder.svg" 
                alt="Portfolio showcase" 
                className="w-full h-full object-cover"
                width={600}
                height={400}
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 rounded-lg overflow-hidden shadow-xl w-56 h-40 rotate-6 bg-white hover:rotate-3 transition-transform duration-500">
              <img 
                src="/placeholder.svg" 
                alt="Code snippet" 
                className="w-full h-full object-cover"
                width={224}
                height={160}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
