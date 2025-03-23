import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseForm from '@/components/forms/CourseForm';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const courseData = {
  1: { id: 1, name: 'Web Development Fundamentals', description: 'Learn the basics of web development', duration: '8 weeks', level: 'Beginner', price: 99.99, imageUrl: 'https://via.placeholder.com/600x400', category: 'Web Development' },
  2: { id: 2, name: 'Advanced Data Structures', description: 'Deep dive into advanced data structures', duration: '10 weeks', level: 'Advanced', price: 149.99, imageUrl: 'https://via.placeholder.com/600x400', category: 'Computer Science' },
  3: { id: 3, name: 'Machine Learning Basics', description: 'Introduction to machine learning concepts', duration: '12 weeks', level: 'Intermediate', price: 129.99, imageUrl: 'https://via.placeholder.com/600x400', category: 'Data Science' },
  4: { id: 4, name: 'React.js Mastery', description: 'Master React.js framework', duration: '6 weeks', level: 'Intermediate', price: 119.99, imageUrl: 'https://via.placeholder.com/600x400', category: 'Web Development' },
  5: { id: 5, name: 'Python for Data Science', description: 'Learn Python for data analysis', duration: '8 weeks', level: 'Beginner', price: 89.99, imageUrl: 'https://via.placeholder.com/600x400', category: 'Data Science' },
};

const CourseFormPage = () => {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState<any>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
      return;
    }

    // For edit mode, fetch the course data
    if (action === 'edit' && id) {
      // TODO: Replace with actual API call
      // Example:
      // const fetchCourse = async () => {
      //   try {
      //     const response = await fetch(`/api/courses/${id}`);
      //     const data = await response.json();
      //     setCourseDetails(data);
      //   } catch (error) {
      //     console.error('Failed to fetch course:', error);
      //     toast.error("Course not found");
      //     navigate('/dashboard/courses');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchCourse();
      
      // Delete this mock data fetch when integrating real API
      const numericId = parseInt(id);
      if (numericId in courseData) {
        setCourseDetails(courseData[numericId as keyof typeof courseData]);
      } else {
        toast.error("Course not found");
        navigate('/dashboard/courses');
      }
    }

    // Delete this mock timeout when integrating real API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [navigate, id, action]);

  const isNewCourse = action === 'new';
  const pageTitle = isNewCourse ? 'Add New Course' : 'Edit Course';
  const pageDescription = isNewCourse 
    ? 'Enter the details for your new course' 
    : `Update the details for ${courseDetails?.name}`;

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
          <Button variant="outline" onClick={() => navigate('/dashboard/courses')}>
            Back to Courses
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
            <CardDescription>{pageDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseForm initialData={courseDetails} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CourseFormPage;
