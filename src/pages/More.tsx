import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ProjectCard, { Project } from '@/components/ProjectCard';
import CourseCard, { Course } from '@/components/CourseCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, BookOpen, Briefcase, GraduationCap, Github, Linkedin, Mail, User } from 'lucide-react';

// Mock data - This would be replaced with API calls
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with React and Laravel, featuring user authentication, product management, and payment processing.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    live_url: "https://example.com",
    type: "personal",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 2, name: "Laravel", color: "red" },
      { id: 3, name: "Tailwind CSS", color: "blue" },
    ],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A task management application with drag-and-drop functionality, team collaboration features, and real-time updates.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    type: "personal",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 4, name: "Node.js", color: "green" },
      { id: 5, name: "MongoDB", color: "green" },
    ],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current weather conditions and forecasts for multiple locations.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    live_url: "https://example.com",
    type: "mini",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 6, name: "API Integration", color: "purple" },
    ],
  },
];

const featuredCourses: Course[] = [
  {
    id: 1,
    name: "Data Structures and Algorithms",
    code: "CS101",
    difficulty: "normal",
    semester: 3,
    credits: 6,
    description: "Introduction to fundamental data structures and algorithms in computer science.",
    has_summary: true,
    summary_format: "markdown",
  },
  {
    id: 2,
    name: "Advanced Web Development",
    code: "WEB202",
    difficulty: "hard",
    semester: 4,
    credits: 5,
    description: "Deep dive into modern web development frameworks and techniques.",
    has_summary: true,
    summary_format: "pdf",
  },
  {
    id: 3,
    name: "Introduction to Artificial Intelligence",
    code: "AI101",
    difficulty: "hard",
    semester: 5,
    credits: 6,
    description: "Foundations of artificial intelligence, machine learning, and neural networks.",
    has_summary: false,
  },
];

const skills = [
  "JavaScript", "TypeScript", "React", "Node.js", 
  "PHP", "Laravel", "MySQL", "PostgreSQL", 
  "HTML/CSS", "Tailwind CSS"
];

const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
  <div className="flex items-center p-4 bg-card border rounded-lg">
    <div className={`p-2 rounded-full ${color}`}>
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const More = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Profile Preview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-background shadow-lg">
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
              <p className="mb-4 max-w-xl">
                I'm a passionate software developer focusing on web technologies and software engineering. Currently pursuing a Computer Science degree while building projects with React, TypeScript, and Laravel.
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
                <Link 
                  to="/" 
                  className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <User className="mr-1.5 h-4 w-4" />
                  Full Profile
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Key Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 10).map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-secondary/50 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
              <Link 
                to="/"
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center"
              >
                More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={<Code className="h-5 w-5 text-blue-600" />} 
              title="Projects Completed" 
              value="24" 
              color="bg-blue-100"
            />
            <StatCard 
              icon={<Briefcase className="h-5 w-5 text-purple-600" />} 
              title="Technologies Used" 
              value="15" 
              color="bg-purple-100"
            />
            <StatCard 
              icon={<BookOpen className="h-5 w-5 text-green-600" />} 
              title="Course Summaries" 
              value="28" 
              color="bg-green-100"
            />
            <StatCard 
              icon={<GraduationCap className="h-5 w-5 text-amber-600" />} 
              title="Years of Study" 
              value="4" 
              color="bg-amber-100"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-muted-foreground mt-2">
                A selection of my recent development work
              </p>
            </div>
            <Link 
              to="/projects" 
              className="hidden sm:flex items-center text-primary hover:text-primary/90 transition-colors"
            >
              View all projects
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} className="animate-fade-up" />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
            >
              View all projects
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground mt-2">
                University courses with my personal summaries and notes
              </p>
            </div>
            <Link 
              to="/courses" 
              className="hidden sm:flex items-center text-primary hover:text-primary/90 transition-colors"
            >
              View all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} className="animate-fade-up" />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link 
              to="/courses" 
              className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
            >
              View all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to collaborate?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get in touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default More;
