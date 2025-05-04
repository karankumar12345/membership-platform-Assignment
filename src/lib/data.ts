import { User, Post, Event, Comment } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Community Lead',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinDate: '2023-01-15',
    bio: 'Passionate about building communities and connecting people.',
  },
  {
    id: '2',
    name: 'Jamie Chen',
    role: 'Content Creator',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinDate: '2023-02-22',
    bio: 'Digital storyteller with a background in journalism and media production.',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    role: 'Event Coordinator',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinDate: '2023-03-01',
    bio: 'Experienced in planning both virtual and in-person community gatherings.',
  },
  {
    id: '4',
    name: 'Taylor Reed',
    role: 'Tech Enthusiast',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinDate: '2023-03-15',
    bio: 'Always exploring new technologies and sharing insights with the community.',
  },
  {
    id: '5',
    name: 'Jordan Lee',
    role: 'Designer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinDate: '2023-04-10',
    bio: 'Creating beautiful and functional designs for digital products.',
  },
  {
    id: '6',
    name: 'Casey Martinez',
    role: 'Mentor',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinDate: '2023-04-22',
    bio: 'Helping new members navigate the community and make meaningful connections.',
  },
];

export const posts: Post[] = [
  {
    id: '1',
    authorId: '1',
    title: 'Welcome to Our New Community Platform!',
    content: 'I\'m thrilled to announce the launch of our new community platform! This space is designed for all of us to connect, share ideas, and grow together. Feel free to introduce yourself in the comments below.',
    date: '2024-06-01T10:30:00Z',
    likes: 24,
    isLiked: false,
    comments: [
      {
        id: '101',
        authorId: '3',
        content: 'This looks amazing! Can\'t wait to connect with everyone here.',
        date: '2024-06-01T11:15:00Z',
      },
      {
        id: '102',
        authorId: '2',
        content: 'So excited about this new platform! Looking forward to sharing ideas and learning from everyone.',
        date: '2024-06-01T12:45:00Z',
      },
    ],
    tags: ['announcement', 'welcome'],
  },
  {
    id: '2',
    authorId: '2',
    title: 'Tips for Engaging in Online Communities',
    content: 'After years of participating in various online spaces, I\'ve gathered some tips for meaningful engagement: 1) Be authentic, 2) Ask thoughtful questions, 3) Share your expertise generously, 4) Respect different perspectives. What would you add to this list?',
    date: '2024-06-02T14:20:00Z',
    likes: 18,
    isLiked: true,
    comments: [
      {
        id: '201',
        authorId: '6',
        content: 'Great tips! I\'d add: Take time to listen before responding. Sometimes the best contributions come after careful consideration.',
        date: '2024-06-02T15:10:00Z',
      },
    ],
    tags: ['tips', 'community'],
  },
  {
    id: '3',
    authorId: '4',
    title: 'Exploring New Technologies Together',
    content: 'I\'m planning to start a monthly tech exploration thread where we can discuss emerging technologies and their potential impact. Would anyone be interested in co-facilitating these discussions?',
    date: '2024-06-03T09:45:00Z',
    likes: 15,
    isLiked: false,
    comments: [],
    tags: ['technology', 'learning'],
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Virtual Coffee Chat',
    description: 'Join us for an informal virtual coffee to meet fellow community members and chat about whatever\'s on your mind.',
    date: '2024-06-15T09:00:00Z',
    location: 'Zoom',
    organizer: 'Alex Morgan',
    attendees: 12,
    maxAttendees: 20,
    isAttending: false,
    image: 'https://images.pexels.com/photos/6953846/pexels-photo-6953846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Workshop: Effective Online Communication',
    description: 'Learn strategies for clear, effective communication in digital spaces, with practical exercises and takeaways.',
    date: '2024-06-22T14:00:00Z',
    location: 'Google Meet',
    organizer: 'Jamie Chen',
    attendees: 25,
    maxAttendees: 50,
    isAttending: true,
    image: 'https://images.pexels.com/photos/7709452/pexels-photo-7709452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Community Showcase: Member Projects',
    description: 'A showcase event where members can present their projects, get feedback, and find potential collaborators.',
    date: '2024-06-30T15:30:00Z',
    location: 'Discord',
    organizer: 'Sam Wilson',
    attendees: 18,
    maxAttendees: 30,
    isAttending: false,
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getPostAuthor(post: Post): User | undefined {
  return getUserById(post.authorId);
}

export function getCommentAuthor(comment: Comment): User | undefined {
  return getUserById(comment.authorId);
}