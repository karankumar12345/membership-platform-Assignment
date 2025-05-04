'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { UserPlus, MessageSquare } from 'lucide-react';
import { scaleIn } from '@/src/lib/motion';
import { User } from '../../types';
// import { scaleIn } from '@/lib/motion';

interface MemberCardProps {
  member: User;
}

export default function MemberCard({ member }: MemberCardProps) {
  const formattedJoinDate = format(new Date(member.joinDate), 'MMM yyyy');
  
  return (
    <motion.div
      variants={scaleIn()}
      className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-5 flex flex-col items-center text-center">
        {/* Member Avatar */}
        <div className="relative">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-background group-hover:border-primary transition-colors duration-300">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md"
          >
            <span className="text-xs font-bold text-primary-foreground">
              {member.name.charAt(0)}
            </span>
          </motion.div>
        </div>
        
        {/* Member Info */}
        <div className="mt-4 space-y-1.5">
          <h3 className="font-semibold text-lg">{member.name}</h3>
          <p className="text-sm text-primary font-medium">{member.role}</p>
          <p className="text-xs text-muted-foreground">Member since {formattedJoinDate}</p>
        </div>
        
        {/* Member Bio */}
        <p className="mt-3 text-sm text-foreground/80 line-clamp-2">
          {member.bio}
        </p>
        
        {/* Action Buttons */}
        <div className="mt-4 w-full flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <UserPlus size={14} />
            Connect
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <MessageSquare size={14} />
            Message
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}