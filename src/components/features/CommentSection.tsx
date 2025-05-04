'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { Comment } from '../../types';
import { getCommentAuthor } from '@/src/lib/data';
import { fadeIn } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';
// import { getUserById, getCommentAuthor } from '@/lib/data';
// import { fadeIn } from '@/lib/motion';
// import { cn } from '@/lib/utils';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export default function CommentSection({ comments, postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate adding a comment
    setTimeout(() => {
      setNewComment('');
      setIsSubmitting(false);
      // In a real app, we would add the comment to the database
    }, 500);
  };
  
  return (
    <div className="p-4 space-y-4">
      {/* Comment input */}
      <form onSubmit={handleSubmit} className="flex items-start space-x-3">
        <div className="relative h-8 w-8 flex-shrink-0">
          <Image 
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Your avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full min-h-[60px] p-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
          />
          
          <div className="flex justify-end mt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                !newComment.trim() || isSubmitting 
                  ? "bg-primary/50 text-primary-foreground/70 cursor-not-allowed" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </motion.button>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => {
            const author = getCommentAuthor(comment);
            if (!author) return null;
            
            return (
              <motion.div 
                key={comment.id}
                variants={fadeIn('up')}
                className="flex space-x-3"
              >
                <div className="relative h-8 w-8 flex-shrink-0">
                  <Image 
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="bg-secondary/40 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{author.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.date), 'MMM d, h:mm a')}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1 ml-1">
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Like
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}