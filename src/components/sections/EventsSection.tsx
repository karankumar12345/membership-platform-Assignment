'use client';

import { motion } from 'framer-motion';
// import { Calendar } from '../ui/calendar';
import { staggerContainer } from '@/src/lib/motion';
import { events } from '@/src/lib/data';
import EventCard from '../features/Event';
// import { Calendar } from 'lucide-react';
// import { events } from '@/lib/data';
// import EventCard from '@/components/features/Event';
// import { staggerContainer } from '@/lib/motion';

export default function EventsSection() {
  return (
    <section id="events" className="py-16 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl">
              Join our virtual and in-person events to connect, learn, and grow with the community.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
           
            View All Events
          </motion.button>
        </div>
        
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}