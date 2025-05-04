'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { Post as PostType, User } from '../../types';
// import { scaleIn, pulseAnimation } from '@/lib/motion';
import CommentSection from './CommentSection';
import { pulseAnimation, scaleIn } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';
// import { cn } from '@/lib/utils';

interface PostProps {
  post: PostType;
  author: User;
}

export default function Post({ post, author }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  
  const toggleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const formattedDate = format(new Date(post.date), 'MMM d, yyyy');

  return (
    <motion.div 
      variants={scaleIn()}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{author.name}</h3>
            <p className="text-xs text-muted-foreground">{formattedDate} • {author.role}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <MoreHorizontal size={18} />
        </motion.button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-foreground/90 whitespace-pre-line">{post.content}</p>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={pulseAnimation}
            onClick={toggleLike}
            className="flex items-center space-x-1.5 group"
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "group-hover:text-red-500"
              )} 
            />
            <span className={cn(
              "text-sm transition-colors",
              isLiked ? "text-red-500" : "text-muted-foreground group-hover:text-red-500"
            )}>
              {likes}
            </span>
          </motion.button>
          
          <motion.button
            whileHover={pulseAnimation}
            onClick={toggleComments}
            className="flex items-center space-x-1.5 group"
          >
            <MessageSquare 
              size={18} 
              className="text-muted-foreground group-hover:text-foreground transition-colors" 
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {post.comments.length}
            </span>
          </motion.button>
          
          <motion.button
            whileHover={pulseAnimation}
            className="flex items-center space-x-1.5 group"
          >
            <Share2 
              size={18} 
              className="text-muted-foreground group-hover:text-foreground transition-colors" 
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Share
            </span>
          </motion.button>
        </div>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-border"
        >
          <CommentSection 
            comments={post.comments} 
            postId={post.id} 
          />
        </motion.div>
      )}
    </motion.div>
  );
}