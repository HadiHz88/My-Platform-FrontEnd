import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Heart, Download, Plus } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const courses = [
  { id: 1, name: 'Web Development Fundamentals', downloads: 45, likes: 32 },
  { id: 2, name: 'Advanced Data Structures', downloads: 38, likes: 27 },
  { id: 3, name: 'Machine Learning Basics', downloads: 42, likes: 30 },
  { id: 4, name: 'React.js Mastery', downloads: 36, likes: 29 },
  { id: 5, name: 'Python for Data Science', downloads: 52, likes: 41 },
];

const DashboardCourses = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [coursesData, setCoursesData] = useState([]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock authentication check and data fetch with your API calls
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    } else {
      // TODO: Replace with actual API call to fetch courses
      // Example:
      // const fetchCourses = async () => {
      //   try {
      //     const response = await fetch('/api/courses');
      //     const data = await response.json();
      //     setCoursesData(data);
      //   } catch (error) {
      //     console.error('Failed to fetch courses:', error);
      //     toast.error('Failed to load courses');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchCourses();
      
      // Delete this mock timeout when integrating real API
      setTimeout(() => {
        setCoursesData(courses);
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
          <h1 className="text-3xl font-bold">Courses</h1>
          <Button onClick={() => navigate('/dashboard/courses/new')} className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Courses</CardTitle>
              <CardDescription>Manage your courses and materials</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Here you can view and manage all your courses. Click on a course to edit its details.</p>
            
            <div className="space-y-4">
              {coursesData.map((course, index) => (
                <div 
                  key={course.id} 
                  className="flex items-center justify-between border-b pb-3 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <span className="font-medium">{course.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Heart className="mr-1 h-3 w-3" /> {course.likes}
                    </span>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Download className="mr-1 h-3 w-3" /> {course.downloads}
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="transition-colors hover:bg-primary/10"
                      onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)}
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

export default DashboardCourses;
