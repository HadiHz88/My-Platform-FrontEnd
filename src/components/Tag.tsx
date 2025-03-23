
import React from 'react';
import { cn } from '@/lib/utils';

type TagColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'gray';

interface TagProps {
  name: string;
  color?: TagColor;
  icon?: React.ReactNode;
  className?: string;
}

const getTagColors = (color: TagColor) => {
  const colors = {
    blue: "bg-tag-blue text-blue-800",
    green: "bg-tag-green text-green-800",
    purple: "bg-tag-purple text-purple-800",
    yellow: "bg-tag-yellow text-yellow-800",
    red: "bg-tag-red text-red-800",
    gray: "bg-tag-gray text-gray-800",
  };
  
  return colors[color];
};

const Tag = ({ name, color = 'gray', icon, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getTagColors(color),
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {name}
    </span>
  );
};

export default Tag;
