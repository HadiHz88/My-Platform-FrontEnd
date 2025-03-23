
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
  tags: string[];
  commentCount: number;
}

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

const BlogPostCard = ({ post, className, featured = false }: BlogPostCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md", 
      featured ? "border-primary/20" : "", 
      className
    )}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-white">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
        <Link 
          to={`/blog/${post.id}`} 
          className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors"
        >
          {post.title}
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to={`/blog/${post.id}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
