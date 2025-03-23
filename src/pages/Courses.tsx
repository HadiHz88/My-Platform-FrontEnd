import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CourseCard, { Course } from '@/components/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const courses: Course[] = [
  {
    id: 1,
    name: "Data Structures and Algorithms",
    code: "CS101",
    difficulty: "normal",
    semester: 3,
    credits: 6,
    description: "Introduction to fundamental data structures and algorithms in computer science.",
    has_summary: true,
    summary_format: "markdown",
  },
  {
    id: 2,
    name: "Advanced Web Development",
    code: "WEB202",
    difficulty: "hard",
    semester: 4,
    credits: 5,
    description: "Deep dive into modern web development frameworks and techniques.",
    has_summary: true,
    summary_format: "pdf",
  },
  {
    id: 3,
    name: "Introduction to Artificial Intelligence",
    code: "AI101",
    difficulty: "hard",
    semester: 5,
    credits: 6,
    description: "Foundations of artificial intelligence, machine learning, and neural networks.",
    has_summary: false,
  },
  {
    id: 4,
    name: "Database Systems",
    code: "DB201",
    difficulty: "normal",
    semester: 3,
    credits: 5,
    description: "Design and implementation of database systems, including SQL, normalization, and transaction processing.",
    has_summary: true,
    summary_format: "markdown",
  },
  {
    id: 5,
    name: "Computer Networks",
    code: "NET301",
    difficulty: "hard",
    semester: 5,
    credits: 5,
    description: "Principles and practice of computer networking, including protocols, architecture, and security.",
    has_summary: true,
    summary_format: "pdf",
  },
  {
    id: 6,
    name: "Mobile App Development",
    code: "MOB202",
    difficulty: "normal",
    semester: 4,
    credits: 4,
    description: "Development of mobile applications for iOS and Android platforms using React Native.",
    has_summary: true,
    summary_format: "markdown",
  },
  {
    id: 7,
    name: "Operating Systems",
    code: "OS301",
    difficulty: "hard",
    semester: 5,
    credits: 6,
    description: "Design and implementation of operating systems, including process management, memory management, and file systems.",
    has_summary: false,
  },
  {
    id: 8,
    name: "Software Engineering",
    code: "SE201",
    difficulty: "normal",
    semester: 4,
    credits: 5,
    description: "Principles and practices of software engineering, including requirements, design, testing, and project management.",
    has_summary: true,
    summary_format: "pdf",
  },
  {
    id: 9,
    name: "Web Security",
    code: "SEC301",
    difficulty: "hard",
    semester: 6,
    credits: 4,
    description: "Security principles and practices for web applications, including authentication, authorization, and common vulnerabilities.",
    has_summary: true,
    summary_format: "markdown",
  },
  {
    id: 10,
    name: "Programming Languages",
    code: "PL301",
    difficulty: "normal",
    semester: 5,
    credits: 4,
    description: "Principles of programming language design, including syntax, semantics, and language implementation.",
    has_summary: false,
  },
  {
    id: 11,
    name: "Computer Graphics",
    code: "CG301",
    difficulty: "hard",
    semester: 6,
    credits: 5,
    description: "Principles and practice of computer graphics, including 2D and 3D rendering, shading, and animation.",
    has_summary: true,
    summary_format: "pdf",
  },
  {
    id: 12,
    name: "Introduction to Programming",
    code: "CS100",
    difficulty: "easy",
    semester: 1,
    credits: 4,
    description: "Introduction to programming concepts and problem-solving using Python.",
    has_summary: true,
    summary_format: "markdown",
  },
];

const CoursesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [coursesData, setCoursesData] = useState<Course[]>([]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock data fetch with your API call
  useEffect(() => {
    // TODO: Replace with actual API call to fetch courses
    // Example:
    // const fetchCourses = async () => {
    //   try {
    //     const response = await fetch('/api/courses');
    //     const data = await response.json();
    //     setCoursesData(data);
    //   } catch (error) {
    //     console.error('Failed to fetch courses:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchCourses();
    
    // Delete this mock timeout when integrating real API
    const timer = setTimeout(() => {
      setCoursesData(courses);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter courses based on tab and search query
  const filteredCourses = coursesData.filter(course => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "easy" && course.difficulty === "easy") ||
      (activeTab === "normal" && course.difficulty === "normal") ||
      (activeTab === "hard" && course.difficulty === "hard");
      
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <Layout>
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Courses</h1>
            <p className="text-muted-foreground mb-8">
              A collection of university courses I've taken, along with my personal summaries and notes.
            </p>
            
            {/* Search and Filter */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Tabs for filtering */}
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="all" className="px-4">All Courses</TabsTrigger>
                <TabsTrigger value="easy" className="px-4">Easy</TabsTrigger>
                <TabsTrigger value="normal" className="px-4">Normal</TabsTrigger>
                <TabsTrigger value="hard" className="px-4">Hard</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Courses Grid - Adjusted to 2 cards per row */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoursesPage;

