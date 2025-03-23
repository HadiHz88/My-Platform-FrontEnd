import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Book, Code, Play, Download, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const courseData = {
  id: '1',
  name: 'Advanced Data Structures',
  code: 'CS301',
  difficulty: 'hard',
  semester: 3,
  credits: 4,
  description: 'This course covers advanced data structures and algorithms necessary for efficient software development.',
  tags: ['Algorithms', 'C++', 'Computer Science'],
  materials: [
    { id: '1', title: 'Course Syllabus', type: 'document', url: '#', downloads: 45 },
    { id: '2', title: 'Lecture Notes: Graphs', type: 'document', url: '#', downloads: 30 },
    { id: '3', title: 'Algorithm Visualization Tool', type: 'interactive', url: '#', downloads: 25 },
    { id: '4', title: 'Programming Assignment 1', type: 'exercise', url: '#', downloads: 38 },
  ],
  summary: `
## Course Overview

Advanced Data Structures covers the analysis and implementation of sophisticated data structures and algorithms.

### Learning Objectives

- Design and implement advanced data structures
- Analyze algorithm complexity and performance
- Apply appropriate data structures to solve complex problems

### Week-by-Week Schedule

1. **Week 1**: Recap of Basic Data Structures
2. **Week 2**: Advanced Tree Structures
3. **Week 3**: Graph Representations and Algorithms
4. **Week 4**: Hashing Techniques
5. **Week 5**: Advanced Sorting Algorithms  
  `,
};

const CoursePreview = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(courseData);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourse(courseData);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleDownload = (materialId: string, title: string) => {
    console.log(`Downloading ${title} (ID: ${materialId})`);
    toast.success(`Started downloading: ${title}`);
    
    setTimeout(() => {
      const donationButton = document.getElementById('donation-button');
      if (donationButton) {
        donationButton.click();
      }
    }, 1500);
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
    toast.success(hasLiked ? 'Removed like' : 'Added like');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{course.name}</h1>
            <div className="flex flex-wrap items-center mt-2 text-muted-foreground text-sm">
              <span className="mr-4">{course.code}</span>
              <span className="mr-4">Semester {course.semester}</span>
              <span>{course.credits} credits</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-start mt-3 md:mt-0">
            <Button onClick={handleLike} variant="outline" className="flex items-center gap-2">
              <Heart className={`h-4 w-4 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likes}</span>
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{course.description}</p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="materials" className="flex-grow">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Materials</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex-grow">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex-grow">
              <Code className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex-grow">
              <Play className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Tutorials</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.materials.map((material) => (
                <Card key={material.id}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>
                      Type: {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button onClick={() => handleDownload(material.id, material.title)} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download ({material.downloads})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="summary">
            <Card>
              <CardContent className="prose dark:prose-invert mt-6 p-4 max-w-full overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: course.summary }} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exercises">
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground py-6">No exercises available for this course yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground py-6">No tutorials available for this course yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CoursePreview;

