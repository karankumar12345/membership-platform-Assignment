'use client';

import { fadeIn, staggerContainer } from '@/src/lib/motion';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { useState } from 'react';
import MemberCard from '../features/Member';
import { users } from '@/src/lib/data';


export default function MembersSection() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMembers = users.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="members" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Members</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our diverse community of professionals, creators, and enthusiasts.
          </p>
        </div>
        
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search members by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-full border border-border bg-card focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>
        
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.length > 0 ? (
            filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))
          ) : (
            <motion.div
              variants={fadeIn()}
              className="col-span-full py-12 text-center"
            >
              <Users size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No members found matching &ldquo;{searchQuery}&ldquo;</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                View All Members
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}