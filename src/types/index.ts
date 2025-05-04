export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  joinDate: string;
  bio: string;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  date: string;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  isAttending: boolean;
  image: string;
}