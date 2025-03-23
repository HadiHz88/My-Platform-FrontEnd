import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectForm from '@/components/forms/ProjectForm';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const projectData = {
  1: { id: 1, title: 'E-commerce Platform', description: 'A full-featured e-commerce platform with payment integration', tags: ['React', 'Node.js', 'MongoDB'], imageUrl: 'https://via.placeholder.com/600x400', githubUrl: 'https://github.com', liveUrl: 'https://example.com' },
  2: { id: 2, title: 'Weather Dashboard', description: 'Real-time weather data visualization', tags: ['JavaScript', 'Chart.js', 'API'], imageUrl: 'https://via.placeholder.com/600x400', githubUrl: 'https://github.com', liveUrl: 'https://example.com' },
  3: { id: 3, title: 'Machine Learning Model', description: 'Image classification using TensorFlow', tags: ['Python', 'TensorFlow', 'ML'], imageUrl: 'https://via.placeholder.com/600x400', githubUrl: 'https://github.com', liveUrl: 'https://example.com' },
  4: { id: 4, title: 'Task Management App', description: 'A productivity app for task management', tags: ['React', 'Firebase', 'MUI'], imageUrl: 'https://via.placeholder.com/600x400', githubUrl: 'https://github.com', liveUrl: 'https://example.com' },
  5: { id: 5, title: 'Social Media Analytics', description: 'Analytics dashboard for social media metrics', tags: ['Vue.js', 'D3.js', 'Express'], imageUrl: 'https://via.placeholder.com/600x400', githubUrl: 'https://github.com', liveUrl: 'https://example.com' },
};

const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<any>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
      return;
    }

    // For edit mode, fetch the project data
    if (action === 'edit' && id) {
      // TODO: Replace with actual API call
      // Example:
      // const fetchProject = async () => {
      //   try {
      //     const response = await fetch(`/api/projects/${id}`);
      //     const data = await response.json();
      //     setProjectDetails(data);
      //   } catch (error) {
      //     console.error('Failed to fetch project:', error);
      //     toast.error("Project not found");
      //     navigate('/dashboard/projects');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchProject();
      
      // Delete this mock data fetch when integrating real API
      const numericId = parseInt(id);
      if (numericId in projectData) {
        setProjectDetails(projectData[numericId as keyof typeof projectData]);
      } else {
        toast.error("Project not found");
        navigate('/dashboard/projects');
      }
    }

    // Delete this mock timeout when integrating real API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [navigate, id, action]);

  const isNewProject = action === 'new';
  const pageTitle = isNewProject ? 'Add New Project' : 'Edit Project';
  const pageDescription = isNewProject 
    ? 'Enter the details for your new project' 
    : `Update the details for ${projectDetails?.title}`;

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-60 mb-2" />
          </div>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-40" />
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
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/projects')}>
            Back to Projects
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
            <CardDescription>{pageDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectForm initialData={projectDetails} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectFormPage;
