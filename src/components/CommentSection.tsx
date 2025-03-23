
import React, { useState } from 'react';
import { User, MessageCircle, ThumbsUp, Flag, Reply } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  blogPostId: string;
  comments: Comment[];
  className?: string;
}

const CommentItem = ({ comment, level = 0 }: { comment: Comment; level?: number }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      toast.success('Reply submitted!');
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={cn("py-4", level > 0 ? "pl-6 border-l" : "")}>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{comment.author.name}</h4>
            <span className="text-xs text-muted-foreground">{comment.date}</span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>
          <div className="flex gap-4 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs" 
              onClick={handleLike}
            >
              <ThumbsUp className={cn("h-4 w-4 mr-1", liked ? "fill-primary text-primary" : "")} />
              {liked ? comment.likes + 1 : comment.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Flag className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
          
          {showReplyInput && (
            <div className="mt-3">
              <Textarea 
                placeholder="Write a reply..." 
                className="min-h-[80px]"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReplyInput(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleReply}>
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ blogPostId, comments, className }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      toast.success('Comment submitted!');
      setNewComment('');
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea 
                placeholder="Write a comment..." 
                className="min-h-[100px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleSubmitComment}>
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator />
      
      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
