
import PostsSection from '../components/sections/PostsSection';
import EventsSection from '../components/sections/EventsSection';
import MembersSection from '../components/sections/MembersSection';
import Hero from '../components/sections/Hero';
// import PostsSection from '@/components/sections/PostsSection';
// import EventsSection from '@/components/sections/EventsSection';
// import MembersSection from '@/components/sections/MembersSection';

export default function Home() {
  return (
    <div>
    
      <Hero />
      <PostsSection />
      <EventsSection />
      <MembersSection />
    </div>
  );
}