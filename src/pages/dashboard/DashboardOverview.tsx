
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileEdit, Heart, Download, Eye } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

// Mock data for analytics
const visitData = [
  { name: 'Jan', visits: 400 },
  { name: 'Feb', visits: 300 },
  { name: 'Mar', visits: 500 },
  { name: 'Apr', visits: 200 },
  { name: 'May', visits: 300 },
  { name: 'Jun', visits: 550 },
  { name: 'Jul', visits: 450 },
];

const popularProjects = [
  { id: 1, title: 'E-commerce Platform', likes: 15, views: 230 },
  { id: 2, title: 'Weather Dashboard', likes: 23, views: 180 },
  { id: 3, title: 'Machine Learning Model', likes: 19, views: 150 },
];

const popularCourses = [
  { id: 1, name: 'Web Development Fundamentals', downloads: 45, likes: 32 },
  { id: 2, name: 'Advanced Data Structures', downloads: 38, likes: 27 },
  { id: 3, name: 'Machine Learning Basics', downloads: 42, likes: 30 },
];

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    } else {
      // Simulate loading for a smoother transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-56" />
                </CardHeader>
                <CardContent>
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex justify-between mb-4">
                      <Skeleton className="h-5 w-48" />
                      <div className="flex gap-4">
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 rounded-md animate-pulse" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 animate-fade-in">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Eye className="mr-2 h-4 w-4" />
                Total Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,705</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Heart className="mr-2 h-4 w-4" />
                Total Likes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">212</div>
              <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Download className="mr-2 h-4 w-4" />
                Total Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">140</div>
              <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="transition-all duration-500 hover:shadow-md animate-fade-in" style={{animationDelay: "0.1s"}}>
            <CardHeader>
              <CardTitle>Popular Projects</CardTitle>
              <CardDescription>Your most liked and viewed projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {popularProjects.map(project => (
                  <li key={project.id} className="flex items-center justify-between">
                    <span className="font-medium">{project.title}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Heart className="mr-1 h-3 w-3" /> {project.likes}
                      </span>
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Eye className="mr-1 h-3 w-3" /> {project.views}
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/dashboard/projects/edit/${project.id}`)}>
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-500 hover:shadow-md animate-fade-in" style={{animationDelay: "0.2s"}}>
            <CardHeader>
              <CardTitle>Popular Courses</CardTitle>
              <CardDescription>Your most downloaded and liked courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {popularCourses.map(course => (
                  <li key={course.id} className="flex items-center justify-between">
                    <span className="font-medium">{course.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Heart className="mr-1 h-3 w-3" /> {course.likes}
                      </span>
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Download className="mr-1 h-3 w-3" /> {course.downloads}
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/dashboard/courses/edit/${course.id}`)}>
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="transition-all duration-500 hover:shadow-md animate-fade-in" style={{animationDelay: "0.3s"}}>
          <CardHeader>
            <CardTitle>Monthly Visits</CardTitle>
            <CardDescription>Number of visits over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{ visits: { theme: { light: '#2563eb', dark: '#3b82f6' } } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="var(--color-visits)" 
                      strokeWidth={2}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardOverview;
