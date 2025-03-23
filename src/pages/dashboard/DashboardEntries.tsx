import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Plus } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const entries = [
  { id: 1, title: 'Software Engineer', organization: 'Tech Company Inc.', startDate: '2020', endDate: '2023', type: 'experience' },
  { id: 2, title: 'Frontend Developer', organization: 'Digital Agency', startDate: '2018', endDate: '2020', type: 'experience' },
  { id: 3, title: 'Computer Science Degree', organization: 'University', startDate: '2014', endDate: '2018', type: 'education' },
  { id: 4, title: 'Web Development Bootcamp', organization: 'Coding Academy', startDate: '2013', endDate: '2014', type: 'education' },
];

const DashboardEntries = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [entriesData, setEntriesData] = useState([]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock authentication check and data fetch with your API calls
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    } else {
      // TODO: Replace with actual API call to fetch entries
      // Example:
      // const fetchEntries = async () => {
      //   try {
      //     const response = await fetch('/api/entries');
      //     const data = await response.json();
      //     setEntriesData(data);
      //   } catch (error) {
      //     console.error('Failed to fetch entries:', error);
      //     toast.error('Failed to load entries');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchEntries();
      
      // Delete this mock timeout when integrating real API
      setTimeout(() => {
        setEntriesData(entries);
        setIsLoading(false);
      }, 800);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-60" />
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
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <Skeleton className="h-5 w-48 mb-1" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-md" />
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
          <h1 className="text-3xl font-bold">Experience & Education</h1>
          <Button onClick={() => navigate('/dashboard/entries/new')} className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Entries</CardTitle>
              <CardDescription>Manage your work history and education</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Here you can view and manage all your experience and education entries.</p>
            
            <div className="space-y-4">
              {entriesData.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className="flex items-center justify-between border-b pb-3 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div>
                    <span className="font-medium">{entry.title}</span>
                    <div className="text-sm text-muted-foreground">{entry.organization} • {entry.startDate}-{entry.endDate}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {entry.type}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="transition-colors hover:bg-primary/10"
                    onClick={() => navigate(`/dashboard/entries/edit/${entry.id}`)}
                  >
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardEntries;
