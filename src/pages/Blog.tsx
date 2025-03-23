
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';
import BlogPostCard, { BlogPost } from '@/components/BlogPostCard';

// Sample blog data
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  
  const itemsPerPage = 4;
  const featuredPost = sampleBlogPosts[0];
  
  const filteredPosts = sampleBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = category === 'all' || post.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'comments') {
      return b.commentCount - a.commentCount;
    }
    return 0;
  });
  
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);
  
  const categories = ['all', ...new Set(sampleBlogPosts.map(post => post.category))];
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, programming, and technology.
          </p>
        </div>
        
        {/* Featured Blog Post */}
        <div className="mb-16">
          <BlogPostCard post={featuredPost} featured={true} className="max-w-4xl mx-auto" />
        </div>
        
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search blogs..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
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
              
              <div>
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="comments">Most Comments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Empty State */}
        {paginatedPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
                setSortBy('latest');
                setCurrentPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {sortedPosts.length > 0 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                  if (i === 4) return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                  if (i === 0) return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  if (i === 0) return (
                    <PaginationItem key={i}>
                      <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                    </PaginationItem>
                  );
                  if (i === 1) return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                  if (i === 3) return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                  if (i === 4) return (
                    <PaginationItem key={i}>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  );
                  pageNumber = currentPage + i - 2;
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
