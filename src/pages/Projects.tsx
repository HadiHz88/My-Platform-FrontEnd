
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProjectCard, { Project } from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data - In a real app, this would be fetched from an API
const projects: Project[] = [
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
  {
    id: 4,
    title: "Corporate Website",
    description: "A responsive corporate website with a content management system, blog, and contact forms.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    live_url: "https://example.com",
    type: "corporate",
    tags: [
      { id: 7, name: "WordPress", color: "blue" },
      { id: 8, name: "PHP", color: "purple" },
      { id: 9, name: "jQuery", color: "blue" },
    ],
  },
  {
    id: 5,
    title: "Expense Tracker",
    description: "A mobile-responsive expense tracking application with data visualization and budget planning features.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    type: "mini",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 10, name: "Chart.js", color: "green" },
      { id: 11, name: "Firebase", color: "yellow" },
    ],
  },
  {
    id: 6,
    title: "Real Estate Listings",
    description: "A real estate listings website with property search, filters, and map integration.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    live_url: "https://example.com",
    type: "corporate",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 12, name: "Google Maps API", color: "green" },
      { id: 13, name: "Express.js", color: "purple" },
    ],
  },
  {
    id: 7,
    title: "Recipe Sharing Platform",
    description: "A community-driven recipe sharing platform with user profiles, ratings, and comments.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    live_url: "https://example.com",
    type: "personal",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 14, name: "GraphQL", color: "pink" },
      { id: 15, name: "PostgreSQL", color: "blue" },
    ],
  },
  {
    id: 8,
    title: "Portfolio Generator",
    description: "A tool for developers to quickly generate and deploy portfolio websites from templates.",
    image_url: "/placeholder.svg",
    github_url: "https://github.com",
    type: "mini",
    tags: [
      { id: 1, name: "React", color: "blue" },
      { id: 16, name: "Next.js", color: "black" },
      { id: 17, name: "Vercel API", color: "blue" },
    ],
  },
];

const ProjectsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulating data loading delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter projects based on tab and search query
  const filteredProjects = projects.filter(project => {
    const matchesTab = activeTab === "all" || project.type === activeTab;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  return (
    <Layout>
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Projects</h1>
            <p className="text-muted-foreground mb-8">
              A collection of my software development projects, from small experiments to full-featured applications.
            </p>
            
            {/* Search and Filter */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Tabs for filtering */}
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="all" className="px-4">All</TabsTrigger>
                <TabsTrigger value="personal" className="px-4">Personal</TabsTrigger>
                <TabsTrigger value="corporate" className="px-4">Corporate</TabsTrigger>
                <TabsTrigger value="mini" className="px-4">Mini Projects</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <Skeleton className="h-48 w-full rounded-md" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
