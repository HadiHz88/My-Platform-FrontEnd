import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Eye, Heart, Plus } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const projects = [
  { id: 1, title: 'E-commerce Platform', likes: 15, views: 230 },
  { id: 2, title: 'Weather Dashboard', likes: 23, views: 180 },
  { id: 3, title: 'Machine Learning Model', likes: 19, views: 150 },
  { id: 4, title: 'Task Management App', likes: 12, views: 140 },
  { id: 5, title: 'Social Media Analytics', likes: 17, views: 165 },
];

const DashboardProjects = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [projectsData, setProjectsData] = useState([]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock authentication check and data fetch with your API calls
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    } else {
      // TODO: Replace with actual API call to fetch projects
      // Example:
      // const fetchProjects = async () => {
      //   try {
      //     const response = await fetch('/api/projects');
      //     const data = await response.json();
      //     setProjectsData(data);
      //   } catch (error) {
      //     console.error('Failed to fetch projects:', error);
      //     toast.error('Failed to load projects');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchProjects();
      
      // Delete this mock timeout when integrating real API
      setTimeout(() => {
        setProjectsData(projects);
        setIsLoading(false);
      }, 800);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-56" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-6" />
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <Skeleton className="h-5 w-48" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button onClick={() => navigate('/dashboard/projects/new')} className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Here you can view and manage all your projects. Click on a project to edit its details.</p>
            
            <div className="space-y-4">
              {projectsData.map((project, index) => (
                <div 
                  key={project.id} 
                  className="flex items-center justify-between border-b pb-3 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <span className="font-medium">{project.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Heart className="mr-1 h-3 w-3" /> {project.likes}
                    </span>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Eye className="mr-1 h-3 w-3" /> {project.views}
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="transition-colors hover:bg-primary/10"
                      onClick={() => navigate(`/dashboard/projects/edit/${project.id}`)}
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardProjects;
