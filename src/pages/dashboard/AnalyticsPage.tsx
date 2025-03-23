
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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

const downloadData = [
  { name: 'Jan', downloads: 20 },
  { name: 'Feb', downloads: 15 },
  { name: 'Mar', downloads: 25 },
  { name: 'Apr', downloads: 10 },
  { name: 'May', downloads: 18 },
  { name: 'Jun', downloads: 30 },
  { name: 'Jul', downloads: 22 },
];

const likeData = [
  { name: 'Jan', likes: 30 },
  { name: 'Feb', likes: 25 },
  { name: 'Mar', likes: 40 },
  { name: 'Apr', likes: 15 },
  { name: 'May', likes: 22 },
  { name: 'Jun', likes: 45 },
  { name: 'Jul', likes: 35 },
];

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    } else {
      // Simulate loading
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
          <div className="mb-6">
            <Skeleton className="h-8 w-48" />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-56" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md animate-pulse" />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-56" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-muted/20 rounded-md animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        
        <div className="space-y-6">
          <Card className="transition-all duration-500 hover:shadow-md animate-fade-in">
            <CardHeader>
              <CardTitle>Visit Analytics</CardTitle>
              <CardDescription>Detailed statistics about site visits</CardDescription>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="transition-all duration-500 hover:shadow-md animate-fade-in" style={{animationDelay: "0.2s"}}>
              <CardHeader>
                <CardTitle>Download Analytics</CardTitle>
                <CardDescription>Materials download statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={{ downloads: { theme: { light: '#16a34a', dark: '#22c55e' } } }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={downloadData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="downloads" 
                          fill="var(--color-downloads)" 
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transition-all duration-500 hover:shadow-md animate-fade-in" style={{animationDelay: "0.4s"}}>
              <CardHeader>
                <CardTitle>Like Analytics</CardTitle>
                <CardDescription>Content appreciation statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={{ likes: { theme: { light: '#dc2626', dark: '#ef4444' } } }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={likeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="likes" 
                          fill="var(--color-likes)" 
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
