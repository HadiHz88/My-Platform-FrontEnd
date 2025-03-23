
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import { Github, ExternalLink, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { useInView } from "react-intersection-observer";

interface ProjectTag {
  id: number;
  name: string;
  color?: string;
  icon?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  type: 'mini' | 'personal' | 'corporate';
  tags: ProjectTag[];
  likes?: number;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  delay?: number;
}

const getTypeChip = (type: string) => {
  const types = {
    mini: { label: 'Mini Project', color: 'blue' },
    personal: { label: 'Personal Project', color: 'purple' },
    corporate: { label: 'Corporate Project', color: 'green' },
  };
  
  return types[type as keyof typeof types] || { label: type, color: 'gray' };
};

const getTagColor = (tag: ProjectTag): 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'gray' => {
  const defaultColors = ['blue', 'green', 'purple', 'yellow', 'red'];
  
  if (tag.color) return tag.color as 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'gray';
  
  // Make sure tag.name exists before using it
  if (!tag.name) return defaultColors[0] as 'blue';
  
  const hash = tag.name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + acc;
  }, 0);
  
  return defaultColors[hash % defaultColors.length] as 'blue' | 'green' | 'purple' | 'yellow' | 'red';
};

const ProjectCard = ({ project, className, delay = 0 }: ProjectCardProps) => {
  const { type, title, description, image_url, github_url, live_url, tags } = project;
  const typeInfo = getTypeChip(type);
  const [likes, setLikes] = useState(project.likes || 0);
  const [liked, setLiked] = useState(false);
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
        description: "You liked this project.",
      });
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
    
    // Here you would normally make an API call to update the like count
    // fetch(`/api/projects/${project.id}/like`, { method: 'POST' })
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
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image_url || '/placeholder.svg'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-2">
          <Tag name={typeInfo.label} color={typeInfo.color as 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'gray'} />
        </div>
        
        <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
          <Link to={`/projects/${project.id}`}>{title}</Link>
        </h3>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{description}</p>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {tags && tags.map((tag) => (
            <Tag 
              key={tag.id} 
              name={tag.name} 
              color={getTagColor(tag)}
            />
          ))}
        </div>
        
        <div className="mt-auto pt-4 flex items-center gap-3">
          <button 
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors",
              liked && "text-red-500 hover:text-red-600"
            )}
            aria-label={liked ? "Unlike this project" : "Like this project"}
          >
            <Heart size={18} className={cn(
              "transition-colors",
              liked ? "fill-red-500" : "fill-none"
            )} />
            <span className="text-xs font-medium">{likes}</span>
          </button>

          {github_url && (
            <a 
              href={github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="View source code on GitHub"
            >
              <Github size={18} />
            </a>
          )}
          
          {live_url && (
            <a 
              href={live_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="View live project"
            >
              <ExternalLink size={18} />
            </a>
          )}
          
          <Link 
            to={`/projects/${project.id}`}
            className="ml-auto text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
