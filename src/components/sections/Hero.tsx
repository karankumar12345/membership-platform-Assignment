'use client';

import { fadeIn, staggerContainer } from '@/src/lib/motion';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, MessageSquare } from 'lucide-react';
import Image from 'next/image';
// import { fadeIn, staggerContainer } from '@/lib/motion';

export default function Hero() {
  const stats = [
    { icon: <Users className="w-5 h-5" />, label: 'Members', value: '2,500+' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Events', value: '120+' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Discussions', value: '4,800+' },
  ];

  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <svg className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="pattern-circles" width="100" height="100" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <motion.div 
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero text */}
          <motion.div
            variants={fadeIn('right', 0.2)}
            className="flex-1 text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Connect, Engage & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Grow Together
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Join our vibrant community of passionate individuals sharing ideas, attending events, and building meaningful connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                Join Community
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
              >
                Explore Events
              </motion.button>
            </div>
            
            {/* Stats */}
            <motion.div
              variants={fadeIn('up', 0.5)}
              className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-primary">{stat.icon}</div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div 
            variants={fadeIn('left', 0.4)}
            className="flex-1 relative h-[400px] w-full max-w-[500px]"
          >
            <Image
              src="https://images.pexels.com/photos/7709452/pexels-photo-7709452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Community members connecting"
              fill
              priority
              className="object-cover rounded-2xl shadow-xl"
            />
            
            {/* Floating element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background overflow-hidden"
                    >
                      <Image
                        src={`https://images.pexels.com/photos/${1222271 + i * 100}/pexels-photo-${1222271 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1`}
                        alt={`Community member ${i+1}`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">Join 20+ members</p>
                  <p className="text-xs text-muted-foreground">Online right now</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}