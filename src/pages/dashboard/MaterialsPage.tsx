import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Download, Plus, FileType } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const materials = [
  { id: 1, title: 'Introduction to React', type: 'PDF', courseId: 1, courseName: 'Web Development Fundamentals', downloads: 28, size: '2.4 MB' },
  { id: 2, title: 'JavaScript Best Practices', type: 'PDF', courseId: 1, courseName: 'Web Development Fundamentals', downloads: 35, size: '1.8 MB' },
  { id: 3, title: 'CSS Grid Examples', type: 'ZIP', courseId: 1, courseName: 'Web Development Fundamentals', downloads: 22, size: '4.6 MB' },
  { id: 4, title: 'Data Structures Cheat Sheet', type: 'PDF', courseId: 2, courseName: 'Advanced Data Structures', downloads: 31, size: '1.2 MB' },
  { id: 5, title: 'Graph Algorithms', type: 'PDF', courseId: 2, courseName: 'Advanced Data Structures', downloads: 18, size: '3.5 MB' },
  { id: 6, title: 'Machine Learning Models', type: 'ZIP', courseId: 3, courseName: 'Machine Learning Basics', downloads: 27, size: '8.2 MB' },
];

const MaterialsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [materialsData, setMaterialsData] = useState([]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock authentication check and data fetch with your API calls
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    } else {
      // TODO: Replace with actual API call to fetch materials
      // Example:
      // const fetchMaterials = async () => {
      //   try {
      //     const response = await fetch('/api/materials');
      //     const data = await response.json();
      //     setMaterialsData(data);
      //   } catch (error) {
      //     console.error('Failed to fetch materials:', error);
      //     toast.error('Failed to load materials');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchMaterials();
      
      // Delete this mock timeout when integrating real API
      setTimeout(() => {
        setMaterialsData(materials);
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
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <Skeleton className="h-5 w-48 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
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
          <h1 className="text-3xl font-bold">Materials</h1>
          <Button onClick={() => navigate('/dashboard/materials/new')} className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Materials</CardTitle>
              <CardDescription>Manage your course materials and resources</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Here you can view and manage all your downloadable course materials.</p>
            
            <div className="space-y-4">
              {materialsData.map((material, index) => (
                <div 
                  key={material.id} 
                  className="flex items-center justify-between border-b pb-3 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div>
                    <span className="font-medium">{material.title}</span>
                    <div className="text-sm text-muted-foreground">
                      Course: {material.courseName}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="inline-flex items-center">
                        <FileType className="h-3 w-3 mr-1" /> {material.type}
                      </span>
                      <span>•</span>
                      <span>{material.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Download className="mr-1 h-3 w-3" /> {material.downloads}
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="transition-colors hover:bg-primary/10"
                      onClick={() => navigate(`/dashboard/materials/edit/${material.id}`)}
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

export default MaterialsPage;
