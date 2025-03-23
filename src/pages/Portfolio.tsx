import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, FileText, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const skills = [
  "JavaScript", "TypeScript", "React", "Node.js", 
  "PHP", "Laravel", "MySQL", "PostgreSQL", 
  "HTML/CSS", "Tailwind CSS", "Git", "Docker",
  "API Design", "System Architecture", "Agile Development"
];

const TimelineItem = ({ 
  icon, 
  date, 
  title, 
  organization, 
  location, 
  children 
}: { 
  icon: React.ReactNode;
  date: string;
  title: string;
  organization: string;
  location?: string;
  children?: React.ReactNode;
}) => (
  <div className="relative pl-8 pb-8 group">
    {/* Timeline line */}
    <div className="absolute top-0 left-0 h-full w-px bg-border group-last:bg-transparent"></div>
    
    {/* Timeline icon */}
    <div className="absolute top-0 left-0 -translate-x-1/2 h-6 w-6 flex items-center justify-center rounded-full border bg-background">
      {icon}
    </div>
    
    {/* Content */}
    <div className="flex flex-col">
      <time className="text-sm text-muted-foreground mb-1 flex items-center">
        <Calendar className="mr-1 h-3 w-3" /> {date}
      </time>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{organization}</span>
        {location && (
          <>
            <span>•</span>
            <span className="flex items-center">
              <MapPin className="mr-1 h-3 w-3" /> {location}
            </span>
          </>
        )}
      </div>
      {children && <div className="mt-2 text-muted-foreground">{children}</div>}
    </div>
  </div>
);

const Portfolio = () => {
  return (
    <Layout>
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">About Me</h1>
            
            {/* Profile section */}
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-background shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Hadi Hijazi</h2>
                <p className="text-muted-foreground mb-4">
                  Full Stack Developer & CS Student
                </p>
                <p className="mb-4">
                  I'm a passionate software developer and computer science student with a focus on web technologies and software engineering. I love building elegant solutions to complex problems.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Github className="mr-1.5 h-4 w-4" />
                    GitHub
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="mr-1.5 h-4 w-4" />
                    LinkedIn
                  </a>
                  <a 
                    href="mailto:contact@example.com"
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Mail className="mr-1.5 h-4 w-4" />
                    Email
                  </a>
                  <a 
                    href="/resume.pdf"
                    target="_blank"
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <FileText className="mr-1.5 h-4 w-4" />
                    Resume
                  </a>
                </div>
              </div>
            </div>
            
            {/* Skills section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Skills & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary/50 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Education & Experience section */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Education
                </h2>
                <div className="mt-4 space-y-2">
                  <TimelineItem
                    icon={<GraduationCap className="h-3 w-3" />}
                    date="2020 - Present"
                    title="Bachelor of Science in Computer Science"
                    organization="University of Technology"
                    location="New York, NY"
                  >
                    <p>GPA: 3.8/4.0</p>
                  </TimelineItem>
                  <TimelineItem
                    icon={<GraduationCap className="h-3 w-3" />}
                    date="2018 - 2020"
                    title="Associate Degree in Programming"
                    organization="Community College"
                    location="Boston, MA"
                  />
                </div>
              </div>
              
              {/* Experience */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Experience
                </h2>
                <div className="mt-4 space-y-2">
                  <TimelineItem
                    icon={<Briefcase className="h-3 w-3" />}
                    date="2022 - Present"
                    title="Junior Full Stack Developer"
                    organization="Tech Solutions Inc."
                    location="Remote"
                  >
                    <p>Working on web applications using React, Laravel, and PostgreSQL.</p>
                  </TimelineItem>
                  <TimelineItem
                    icon={<Briefcase className="h-3 w-3" />}
                    date="2021 - 2022"
                    title="Web Development Intern"
                    organization="Startup Hub"
                    location="New York, NY"
                  >
                    <p>Assisted in developing front-end components and integrating APIs.</p>
                  </TimelineItem>
                </div>
              </div>
            </div>
            
            {/* Contact section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to contact me through any of the channels below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="mailto:contact@example.com"
                  className="flex items-center p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">contact@example.com</p>
                  </div>
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                >
                  <Linkedin className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">Connect with me</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
