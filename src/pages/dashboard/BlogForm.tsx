import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import BlogForm from '@/components/BlogForm';
import { BlogPost } from '@/components/BlogPostCard';

// FIXME: API INTEGRATION
// TODO: Replace this sample data with your API call
// Delete this entire mock data when integrating real API
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Optimize React Performance with Proper State Management',
    excerpt: 'Learn the best practices for managing state in React applications to improve performance and user experience.',
    content: 'Full content here...',
    date: 'Jan 15, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'React',
    tags: ['React', 'Performance', 'JavaScript'],
    commentCount: 8,
  },
  {
    id: '2',
    title: 'Building a Full-Stack Portfolio with React and Node.js',
    excerpt: 'A comprehensive guide to creating a professional portfolio website using modern web technologies.',
    content: 'Full content here...',
    date: 'Feb 22, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Portfolio',
    tags: ['React', 'Node.js', 'Portfolio'],
    commentCount: 12,
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Discover how to effectively use TypeScript in large-scale applications to maximize type safety and developer productivity.',
    content: 'Full content here...',
    date: 'Mar 10, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    commentCount: 5,
  },
  {
    id: '4',
    title: 'Creating Responsive Layouts with Tailwind CSS',
    excerpt: 'Learn how to build beautiful, responsive user interfaces quickly and efficiently using Tailwind CSS.',
    content: 'Full content here...',
    date: 'Apr 5, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
    category: 'CSS',
    tags: ['Tailwind CSS', 'Responsive Design', 'CSS'],
    commentCount: 9,
  },
  {
    id: '5',
    title: 'Modern State Management with Redux Toolkit',
    excerpt: 'An in-depth guide to using Redux Toolkit for simplified and more efficient state management in React applications.',
    content: 'Full content here...',
    date: 'May 18, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'React',
    tags: ['Redux', 'React', 'State Management'],
    commentCount: 7,
  },
  {
    id: '6',
    title: 'Building Accessible Web Applications',
    excerpt: 'Essential techniques and best practices for creating web applications that are accessible to all users.',
    content: 'Full content here...',
    date: 'Jun 30, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Accessibility',
    tags: ['Accessibility', 'Web Development', 'HTML'],
    commentCount: 4,
  },
];

const BlogFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogPost | null>(null);

  const isEditing = Boolean(id);
  const title = isEditing ? 'Edit Blog Post' : 'Create New Blog Post';

  // FIXME: API INTEGRATION
  // TODO: Replace this mock fetch with your API call
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      
      // TODO: Replace with actual API call to fetch a single blog
      // Example:
      // const fetchBlog = async () => {
      //   try {
      //     const response = await fetch(`/api/blogs/${id}`);
      //     const data = await response.json();
      //     setBlogData(data);
      //   } catch (error) {
      //     console.error('Failed to fetch blog:', error);
      //     toast.error('Failed to load blog post');
      //     navigate('/dashboard/blogs');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      // fetchBlog();
      
      // Delete this mock timeout and data fetch when integrating real API
      setTimeout(() => {
        const blog = sampleBlogPosts.find(post => post.id === id);
        if (blog) {
          setBlogData(blog);
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, [id, navigate]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock submission with your API call
  const handleSubmit = (data: any) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API calls
    // For creating a new blog:
    // Example:
    // const createBlog = async () => {
    //   try {
    //     await fetch('/api/blogs', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(data)
    //     });
    //     toast.success('Blog post created successfully');
    //     navigate('/dashboard/blogs');
    //   } catch (error) {
    //     console.error('Failed to create blog:', error);
    //     toast.error('Failed to create blog post');
    //     setIsLoading(false);
    //   }
    // };
    
    // For updating an existing blog:
    // Example:
    // const updateBlog = async () => {
    //   try {
    //     await fetch(`/api/blogs/${id}`, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(data)
    //     });
    //     toast.success('Blog post updated successfully');
    //     navigate('/dashboard/blogs');
    //   } catch (error) {
    //     console.error('Failed to update blog:', error);
    //     toast.error('Failed to update blog post');
    //     setIsLoading(false);
    //   }
    // };
    
    // isEditing ? updateBlog() : createBlog();
    
    // Delete this mock timeout when integrating real API
    setTimeout(() => {
      setIsLoading(false);
      
      if (isEditing) {
        toast.success('Blog post updated successfully');
      } else {
        toast.success('Blog post created successfully');
      }
      
      navigate('/dashboard/blogs');
    }, 800);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/blogs')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your existing blog post' : 'Create and publish a new blog post'}
            </p>
          </div>
        </div>

        {/* Form */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <BlogForm 
            initialData={blogData || undefined}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Layout>
  );
};

export default BlogFormPage;
