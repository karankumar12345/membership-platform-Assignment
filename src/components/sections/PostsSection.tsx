'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Filter } from 'lucide-react';
import { getPostAuthor, posts } from '@/src/lib/data';
import { staggerContainer } from '@/src/lib/motion';
import Post from '../features/Post';
// import { posts } from '@/lib/data';
// import Post from '@/components/features/Post';
// import { getPostAuthor } from '@/lib/data';
// import { staggerContainer } from '@/lib/motion';

export default function PostsSection() {
  const [filter, setFilter] = useState('all');
  
  const filterOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'popular', label: 'Popular' },
    { value: 'recent', label: 'Recent' },
  ];
  
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'popular') return post.likes > 15;
    if (filter === 'recent') {
      const postDate = new Date(post.date);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return postDate >= threeDaysAgo;
    }
    return true;
  });

  return (
    <section id="posts" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Discussions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the conversation, share your thoughts, and connect with fellow community members on various topics.
          </p>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Filters */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Filter size={14} />
              Filter:
            </span>
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* New Post Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Pencil size={16} />
            Create Post
          </motion.button>
        </div>
        
        {/* Posts Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-6"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => {
              const author = getPostAuthor(post);
              if (!author) return null;
              
              return (
                <Post key={post.id} post={post} author={author} />
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-muted-foreground">No posts found with the current filter.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                View All Posts
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}