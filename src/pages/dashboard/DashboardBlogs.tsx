import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  MoreHorizontal,
  FileText,
  MessageCircle,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { BlogPost } from '@/components/BlogPostCard';
import { toast } from 'sonner';

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

const DashboardBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      
      try {
        setTimeout(() => {
          setBlogs(sampleBlogPosts);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setIsLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = category === 'all' || blog.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      toast.success('Blog post deleted successfully');
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground">
              Manage your blog content
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {filteredBlogs.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Comments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={blog.imageUrl} 
                            alt={blog.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{blog.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{blog.excerpt}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{blog.category}</Badge>
                    </TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{blog.commentCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/blog/${blog.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/dashboard/blogs/edit/${blog.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No blog posts found</h3>
            <p className="mt-1 text-center text-muted-foreground max-w-md">
              No blog posts match your current filters. Try adjusting your search or create a new blog post.
            </p>
            <div className="mt-6 flex gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
              <Button asChild>
                <Link to="/dashboard/blogs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog Post
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardBlogs;
