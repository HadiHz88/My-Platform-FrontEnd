import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EntryForm from '@/components/forms/EntryForm';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const entryData = {
  1: { id: 1, title: 'Software Engineer', organization: 'Tech Company Inc.', startDate: '2020', endDate: '2023', description: 'Led development of web applications using React and Node.js.', type: 'experience' },
  2: { id: 2, title: 'Frontend Developer', organization: 'Digital Agency', startDate: '2018', endDate: '2020', description: 'Developed responsive web interfaces for clients.', type: 'experience' },
  3: { id: 3, title: 'Computer Science Degree', organization: 'University', startDate: '2014', endDate: '2018', description: 'Bachelor of Science in Computer Science with focus on software development.', type: 'education' },
  4: { id: 4, title: 'Web Development Bootcamp', organization: 'Coding Academy', startDate: '2013', endDate: '2014', description: 'Intensive training in full-stack web development.', type: 'education' },
};

const EntryFormPage = () => {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [entryDetails, setEntryDetails] = useState<any>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
      return;
    }

    // For edit mode, fetch the entry data
    if (action === 'edit' && id) {
      // TODO: Replace with actual API call
      // Example:
      // const fetchEntry = async () => {
      //   try {
      //     const response = await fetch(`/api/entries/${id}`);
      //     const data = await response.json();
      //     setEntryDetails(data);
      //   } catch (error) {
      //     console.error('Failed to fetch entry:', error);
      //     toast.error("Entry not found");
      //     navigate('/dashboard/entries');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchEntry();
      
      // Delete this mock data fetch when integrating real API
      const numericId = parseInt(id);
      if (numericId in entryData) {
        setEntryDetails(entryData[numericId as keyof typeof entryData]);
      } else {
        toast.error("Entry not found");
        navigate('/dashboard/entries');
      }
    }

    // Delete this mock timeout when integrating real API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [navigate, id, action]);

  const isNewEntry = action === 'new';
  const pageTitle = isNewEntry ? 'Add New Entry' : 'Edit Entry';
  const pageDescription = isNewEntry 
    ? 'Enter the details for your new experience or education entry' 
    : `Update the details for ${entryDetails?.title}`;

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
          <Button variant="outline" onClick={() => navigate('/dashboard/entries')}>
            Back to Entries
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
            <CardDescription>{pageDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <EntryForm initialData={entryDetails} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EntryFormPage;
