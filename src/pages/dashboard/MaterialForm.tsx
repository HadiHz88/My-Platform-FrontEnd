import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const materialData = {
  1: { id: 1, title: 'Introduction to React', description: 'Comprehensive guide to React fundamentals', type: 'PDF', courseId: 1, size: '2.4 MB', url: 'https://example.com/files/react-intro.pdf' },
  2: { id: 2, title: 'JavaScript Best Practices', description: 'Learn the best practices for writing clean JavaScript code', type: 'PDF', courseId: 1, size: '1.8 MB', url: 'https://example.com/files/js-best-practices.pdf' },
  3: { id: 3, title: 'CSS Grid Examples', description: 'Sample projects showcasing CSS Grid layout techniques', type: 'ZIP', courseId: 1, size: '4.6 MB', url: 'https://example.com/files/css-grid-examples.zip' },
  4: { id: 4, title: 'Data Structures Cheat Sheet', description: 'Quick reference for common data structures', type: 'PDF', courseId: 2, size: '1.2 MB', url: 'https://example.com/files/data-structures.pdf' },
  5: { id: 5, title: 'Graph Algorithms', description: 'Implementation of various graph algorithms', type: 'PDF', courseId: 2, size: '3.5 MB', url: 'https://example.com/files/graph-algorithms.pdf' },
  6: { id: 6, title: 'Machine Learning Models', description: 'Sample ML models with documentation', type: 'ZIP', courseId: 3, size: '8.2 MB', url: 'https://example.com/files/ml-models.zip' },
};

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const courses = [
  { id: 1, name: 'Web Development Fundamentals' },
  { id: 2, name: 'Advanced Data Structures' },
  { id: 3, name: 'Machine Learning Basics' },
  { id: 4, name: 'React.js Mastery' },
  { id: 5, name: 'Python for Data Science' },
];

// Material form schema
const materialFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.string({
    required_error: "Please select a material type.",
  }),
  courseId: z.string({
    required_error: "Please select a course.",
  }),
  file: z.instanceof(File).optional(),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }).optional(),
});

type MaterialFormValues = z.infer<typeof materialFormSchema>;

const MaterialForm = ({ initialData }: { initialData?: any }) => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  // Set up form with default values from initialData
  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      type: initialData.type,
      courseId: initialData.courseId.toString(),
      url: initialData.url,
    } : {
      title: "",
      description: "",
      type: "",
      courseId: "",
      url: "",
    },
  });

  // FIXME: API INTEGRATION
  // TODO: Replace this mock submission with your API call
  const onSubmit = (data: MaterialFormValues) => {
    setIsUploading(true);
    
    // TODO: Replace with actual API call
    // Example for creating:
    // const createMaterial = async () => {
    //   try {
    //     const formData = new FormData();
    //     Object.entries(data).forEach(([key, value]) => {
    //       if (value !== undefined) formData.append(key, value);
    //     });
    //     
    //     const response = await fetch('/api/materials', {
    //       method: 'POST',
    //       body: formData,
    //     });
    //     
    //     if (!response.ok) throw new Error('Failed to create material');
    //     toast.success("Material added successfully!");
    //     navigate('/dashboard/materials');
    //   } catch (error) {
    //     console.error('Error creating material:', error);
    //     toast.error("Failed to add material");
    //   } finally {
    //     setIsUploading(false);
    //   }
    // };
    
    // Example for updating:
    // const updateMaterial = async () => {
    //   try {
    //     const formData = new FormData();
    //     Object.entries(data).forEach(([key, value]) => {
    //       if (value !== undefined) formData.append(key, value);
    //     });
    //     
    //     const response = await fetch(`/api/materials/${initialData.id}`, {
    //       method: 'PUT',
    //       body: formData,
    //     });
    //     
    //     if (!response.ok) throw new Error('Failed to update material');
    //     toast.success("Material updated successfully!");
    //     navigate('/dashboard/materials');
    //   } catch (error) {
    //     console.error('Error updating material:', error);
    //     toast.error("Failed to update material");
    //   } finally {
    //     setIsUploading(false);
    //   }
    // };
    
    // initialData ? updateMaterial() : createMaterial();
    
    // Delete this mock timeout when integrating real API
    setTimeout(() => {
      toast.success(initialData ? "Material updated successfully!" : "Material added successfully!");
      setIsUploading(false);
      navigate('/dashboard/materials');
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter material title" {...field} />
              </FormControl>
              <FormDescription>
                The name of your material as it will appear to users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a description of the material"
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of what this material contains.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="ZIP">ZIP</SelectItem>
                    <SelectItem value="DOC">DOC</SelectItem>
                    <SelectItem value="PPT">PPT</SelectItem>
                    <SelectItem value="XLS">XLS</SelectItem>
                    <SelectItem value="MP4">MP4</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The file format of your material.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Associated Course</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The course this material belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload your material file (max 10MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>External URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/your-file.pdf"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  If your material is hosted elsewhere, provide the direct URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isUploading} className="min-w-[120px]">
            {isUploading ? 'Uploading...' : initialData ? 'Update Material' : 'Add Material'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const MaterialFormPage = () => {
  const navigate = useNavigate();
  const { id, action } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [materialDetails, setMaterialDetails] = useState<any>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
      return;
    }

    // For edit mode, fetch the material data
    if (action === 'edit' && id) {
      // TODO: Replace with actual API call
      // Example:
      // const fetchMaterial = async () => {
      //   try {
      //     const response = await fetch(`/api/materials/${id}`);
      //     const data = await response.json();
      //     setMaterialDetails(data);
      //   } catch (error) {
      //     console.error('Failed to fetch material:', error);
      //     toast.error("Material not found");
      //     navigate('/dashboard/materials');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchMaterial();
      
      // Delete this mock data fetch when integrating real API
      const numericId = parseInt(id);
      if (numericId in materialData) {
        setMaterialDetails(materialData[numericId as keyof typeof materialData]);
      } else {
        toast.error("Material not found");
        navigate('/dashboard/materials');
      }
    }

    // Delete this mock timeout when integrating real API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [navigate, id, action]);

  const isNewMaterial = action === 'new';
  const pageTitle = isNewMaterial ? 'Add New Material' : 'Edit Material';
  const pageDescription = isNewMaterial 
    ? 'Upload a new material for your courses' 
    : `Update the details for ${materialDetails?.title}`;

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
          <Button variant="outline" onClick={() => navigate('/dashboard/materials')}>
            Back to Materials
          </Button>
        </div>
        
        <Card className="transition-all duration-300 hover:shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle>{pageTitle}</CardTitle>
            <CardDescription>{pageDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <MaterialForm initialData={materialDetails} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MaterialFormPage;
