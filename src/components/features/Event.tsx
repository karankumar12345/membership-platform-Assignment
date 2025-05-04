'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import { Event as EventType } from '../../types';
import { scaleIn } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';
// import { cn } from '@/lib/utils';
// import { scaleIn } from '@/lib/motion';

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  const [isAttending, setIsAttending] = useState(event.isAttending);
  const [attendees, setAttendees] = useState(event.attendees);
  
  const toggleAttendance = () => {
    if (isAttending) {
      setAttendees(prev => prev - 1);
    } else {
      setAttendees(prev => prev + 1);
    }
    setIsAttending(!isAttending);
  };
  
  const formattedDate = format(new Date(event.date), 'EEE, MMM d, yyyy');
  const formattedTime = format(new Date(event.date), 'h:mm a');
  
  const isFullyBooked = attendees >= event.maxAttendees;
  const attendancePercentage = (attendees / event.maxAttendees) * 100;
  
  return (
    <motion.div
      variants={scaleIn()}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Event Image */}
      <div className="relative h-48 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              {event.location}
            </span>
          </div>
          
          <div className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </div>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              <span>{formattedTime}</span>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 line-clamp-2">
            {event.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users size={14} />
              <span>
                {attendees} / {event.maxAttendees} attendees
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {isFullyBooked ? 'Fully booked' : `${event.maxAttendees - attendees} spots left`}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${attendancePercentage}%` }}
              transition={{ duration: 0.5 }}
              className={cn(
                "h-full",
                attendancePercentage < 50 
                  ? "bg-green-500" 
                  : attendancePercentage < 80 
                    ? "bg-yellow-500" 
                    : "bg-red-500"
              )}
            />
          </div>
          
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium">Organizer:</div>
              <div className="text-sm text-muted-foreground">{event.organizer}</div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAttendance}
              disabled={isFullyBooked && !isAttending}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                isAttending
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  : isFullyBooked
                    ? "bg-secondary/50 text-secondary-foreground/50 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isAttending ? 'Attending' : isFullyBooked ? 'Full' : 'Attend'}
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ x: 3 }}
            className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View Details
            <ExternalLink size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}