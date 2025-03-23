import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import { BookOpen, FileText, Heart, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

export interface Course {
  id: number;
  name: string;
  code: string;
  difficulty: 'easy' | 'normal' | 'hard';
  semester: number;
  credits: number;
  description?: string;
  has_summary?: boolean;
  summary_format?: 'pdf' | 'markdown';
  likes?: number;
  downloads?: number;
}

interface CourseCardProps {
  course: Course;
  className?: string;
  delay?: number;
}

const getDifficultyChip = (difficulty: string) => {
  const difficulties = {
    easy: { label: 'Easy', color: 'green' },
    normal: { label: 'Normal', color: 'blue' },
    hard: { label: 'Hard', color: 'red' },
  };
  
  return difficulties[difficulty as keyof typeof difficulties] || { label: difficulty, color: 'gray' };
};

const CourseCard = ({ course, className, delay = 0 }: CourseCardProps) => {
  const { name, code, difficulty, semester, credits, description, has_summary, summary_format } = course;
  const difficultyInfo = getDifficultyChip(difficulty);
  const [likes, setLikes] = useState(course.likes || 0);
  const [liked, setLiked] = useState(false);
  const [downloads, setDownloads] = useState(course.downloads || 0);
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      toast({
        title: "Thanks for your appreciation!",
        description: "You liked this course.",
      });
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
    
    // Here you would normally make an API call to update the like count
    // fetch(`/api/courses/${course.id}/like`, { method: 'POST' })
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDownloads(downloads + 1);
    
    // Here you would normally handle the actual download
    toast({
      title: "Download started",
      description: `${name} materials are being downloaded.`,
    });
    
    // Show donation dialog with 20% probability after download
    if (Math.random() < 0.2) {
      setTimeout(() => {
        setShowDonationDialog(true);
      }, 2000);
    }
    
    // Here you would normally make an API call to track the download
    // fetch(`/api/courses/${course.id}/download`, { method: 'POST' })
  };
  
  return (
    <div 
      ref={ref}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
        inView ? 'animate-fade-up opacity-100' : 'opacity-0',
        className
      )}
      style={{ animationDelay: `${delay * 150}ms` }}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="mb-3 flex flex-wrap gap-2">
          <Tag name={`Semester ${semester}`} color="blue" />
          <Tag name={`${credits} Credits`} color="purple" />
          <Tag name={difficultyInfo.label} color={difficultyInfo.color as 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'gray'} />
        </div>
        
        <h3 className="text-lg font-semibold">
          <Link to={`/courses/${course.id}`} className="hover:text-primary transition-colors">
            {name}
          </Link>
        </h3>
        
        <p className="text-sm font-mono text-muted-foreground mb-3">{code}</p>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors",
                liked && "text-red-500 hover:text-red-600"
              )}
              aria-label={liked ? "Unlike this course" : "Like this course"}
            >
              <Heart size={16} className={cn(
                "transition-colors",
                liked ? "fill-red-500" : "fill-none"
              )} />
              <span className="text-xs font-medium">{likes}</span>
            </button>
            
            {has_summary && (
              <>
                <div className="flex items-center text-xs text-muted-foreground">
                  {summary_format === 'pdf' ? (
                    <FileText size={16} className="mr-1 text-primary" />
                  ) : (
                    <BookOpen size={16} className="mr-1 text-primary" />
                  )}
                  <span>{summary_format === 'pdf' ? 'PDF Summary' : 'Markdown Summary'}</span>
                </div>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Download summary"
                >
                  <Download size={16} />
                  <span className="text-xs font-medium">{downloads}</span>
                </button>
              </>
            )}
          </div>
          
          <Link 
            to={`/courses/${course.id}`}
            className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
      
      <Dialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Support My Work</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">If you find these materials helpful, consider supporting my work with a small donation.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setShowDonationDialog(false)}>Maybe Later</Button>
              <Button onClick={() => window.open('/donate', '_blank')}>Donate</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseCard;
