export const CLUBS = [
  {
    id: 'stacatos',
    name: 'Stacatos (Western & Classical Dance)',
    logo: '💃',
    description: 'The official dance society of the college. We train in western, classical, and hip-hop formats for national group dance events.',
    memberCount: 45,
    accentColor: '#ec4899' // Pink/Rose
  },
  {
    id: 'cu_arcs',
    name: 'CU Arcs (Sports Association)',
    logo: '⚽',
    description: 'Nurturing athletic talent. We organize cricket tournaments, football leagues, table tennis challenges, and athletic meets.',
    memberCount: 160,
    accentColor: '#10b981' // Emerald Green
  },
  {
    id: 'ieee',
    name: 'IEEE (Computing & Tech Society)',
    logo: '⚡',
    description: 'Advancing tech for humanity. We coordinate hands-on workshops, hardware bootcamps, and developer project displays.',
    memberCount: 110,
    accentColor: '#0ea5e9' // Sky Blue
  },
  {
    id: 'euphony',
    name: 'Euphony (Music Society)',
    logo: '🎵',
    description: 'For all vocalists, guitarists, drummers, and symphony enthusiasts. We organize OAT jam sessions and concert shows.',
    memberCount: 75,
    accentColor: '#8b5cf6' // Violet
  },
  {
    id: 'cut_c',
    name: 'CUT-C (Drama & Theater Club)',
    logo: '🎭',
    description: 'Expressing social voices through street plays, mime acts, stage dramas, and scriptwriting workshops.',
    memberCount: 50,
    accentColor: '#f59e0b' // Amber
  },
  {
    id: 'acm',
    name: 'ACM (Association for Computing Machinery)',
    logo: '💻',
    description: 'Building competitive programming skills. We host hackathons, web dev sprints, and tech algorithms talks.',
    memberCount: 130,
    accentColor: '#3b82f6' // Indigo
  },
  {
    id: 'hostel_committee',
    name: 'Hostel Committee (Hostel Welfare)',
    logo: '🏢',
    description: 'Coordinating hostel sports tournaments, mess councils, room arrangements, and annual hostel night events.',
    memberCount: 80,
    accentColor: '#14b8a6' // Teal
  },
  {
    id: 'vibin_z',
    name: 'Vibin.Z (Hostel Life & Culture)',
    logo: '🎧',
    description: 'Bringing vibin hostel vibes! We screen movies, hold late-night acoustic singing circles, and organize tea-chat jam rooms.',
    memberCount: 65,
    accentColor: '#f43f5e' // Crimson/Rose
  },
  {
    id: 'iste',
    name: 'ISTE (Indian Society for Technical Education)',
    logo: '🎓',
    description: 'Nurturing professional development. We host national level seminars, skill classes, and industrial training visits.',
    memberCount: 90,
    accentColor: '#64748b' // Slate
  }
];

export const CREDENTIALS = {
  admin: { role: 'admin', password: 'admin123', name: 'University Admin' },
  stacatos: { role: 'club', clubId: 'stacatos', password: 'stacatos123', name: 'Stacatos Dance Rep' },
  cu_arcs: { role: 'club', clubId: 'cu_arcs', password: 'cuarcs123', name: 'CU Arcs Sports Rep' },
  ieee: { role: 'club', clubId: 'ieee', password: 'ieee123', name: 'IEEE Rep' },
  euphony: { role: 'club', clubId: 'euphony', password: 'euphony123', name: 'Euphony Music Rep' },
  cut_c: { role: 'club', clubId: 'cut_c', password: 'cutc123', name: 'CUT-C Drama Rep' },
  acm: { role: 'club', clubId: 'acm', password: 'acm123', name: 'ACM Comp Rep' },
  hostel_committee: { role: 'club', clubId: 'hostel_committee', password: 'hostel123', name: 'Hostel Committee Rep' },
  vibin_z: { role: 'club', clubId: 'vibin_z', password: 'vibinz123', name: 'Vibin.Z Social Rep' },
  iste: { role: 'club', clubId: 'iste', password: 'iste123', name: 'ISTE Society Rep' }
};

// Helper to get formatted date string relative to today
const getRelativeDateString = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const INITIAL_EVENTS = [
  {
    id: 'event-1',
    title: 'CodeSprint 2026: ACM 12-Hour Hackathon',
    clubId: 'acm',
    clubName: 'ACM Student Chapter',
    description: 'Get ready for the biggest coding challenge of the semester! Teams of 1-3 will solve real-world problems over 12 hours. Food, drinks, and awesome prizes await the winners!',
    date: getRelativeDateString(1), // Tomorrow
    time: '09:00',
    duration: '12 Hours',
    venue: 'CS Main Lab, Block B',
    criteria: 'Open to all years and branches. Basic programming knowledge required.',
    registrationType: 'internal',
    status: 'approved',
    featured: true,
    tags: ['Coding', 'Hackathon', 'Prizes'],
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    registrants: [
      { name: 'Aarav Sharma', roll: '2023CS1005', branch: 'CSE', year: '3rd', email: 'aarav@univ.edu', phone: '9876543210' },
      { name: 'Isha Patel', roll: '2024IT2012', branch: 'IT', year: '2nd', email: 'isha@univ.edu', phone: '9876543211' }
    ]
  },
  {
    id: 'event-2',
    title: 'Euphony Acoustic Jamming Night 2.0',
    clubId: 'euphony',
    clubName: 'Euphony (Music Society)',
    description: 'Unwind and enjoy a beautiful evening filled with acoustic melodies, light snacks, and a cozy atmosphere. Bring your own instrument or just sit back and sing along!',
    date: getRelativeDateString(0), // Today (Live!)
    time: '17:30',
    duration: '3 Hours',
    venue: 'Open Air Theatre (OAT)',
    criteria: 'Open to all students, faculty members, and music lovers.',
    registrationType: 'internal',
    status: 'approved',
    featured: true,
    tags: ['Music', 'Jamming', 'Acoustic'],
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    registrants: [
      { name: 'Kabir Verma', roll: '2022EC3041', branch: 'ECE', year: '4th', email: 'kabir@univ.edu', phone: '9876543212' }
    ]
  },
  {
    id: 'event-3',
    title: 'CUT-C Nukkad Natak (Street Play) - "Safar"',
    clubId: 'cut_c',
    clubName: 'CUT-C (Drama & Theater Club)',
    description: 'Join us for a dynamic street play that highlights student mental health and academic pressure. A performance full of energy, drums, and strong social messages.',
    date: getRelativeDateString(2), // In 2 days
    time: '13:00',
    duration: '45 Minutes',
    venue: 'Central Fountain Plaza',
    criteria: 'No registration required. Just gather and watch!',
    registrationType: 'external',
    registrationLink: 'https://forms.gle/mockstreetplay2026',
    status: 'approved',
    featured: false,
    tags: ['Drama', 'Nukkad Natak', 'Social Issue'],
    poster: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    registrants: []
  },
  {
    id: 'event-4',
    title: 'IEEE WorkShop on IoT & Smart Systems',
    clubId: 'ieee',
    clubName: 'IEEE (Computing & Tech Society)',
    description: 'Learn how to build smart home automation systems using Arduino and ESP8266. This is a complete hands-on hardware workshop. Kits will be provided for teams of 2.',
    date: getRelativeDateString(4), // In 4 days
    time: '10:00',
    duration: '6 Hours',
    venue: 'Seminar Hall 2, Block A',
    criteria: 'Prior registration mandatory. Fee: ₹100 per team (kit cost included).',
    registrationType: 'internal',
    status: 'approved',
    featured: false,
    tags: ['IoT', 'Arduino', 'Workshop'],
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    registrants: [
      { name: 'Nikhil Sen', roll: '2023ME4009', branch: 'Mechanical', year: '3rd', email: 'nikhil@univ.edu', phone: '9876543215' }
    ]
  },
  {
    id: 'event-5',
    title: 'CU Arcs Cricket League Match',
    clubId: 'cu_arcs',
    clubName: 'CU Arcs (Sports Association)',
    description: 'The annual inter-branch cricket league kicks off! Register your hostel/department team with the sports captain. League matches will start next Monday.',
    date: getRelativeDateString(5), // In 5 days
    time: '08:00',
    duration: '5 Days',
    venue: 'Main College Sports Ground',
    criteria: 'One team per department. Register via sports captain.',
    registrationType: 'external',
    registrationLink: 'https://sports.collegeportal.edu/cricket',
    status: 'approved',
    featured: false,
    tags: ['Cricket', 'Sports', 'Tournament'],
    poster: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    registrants: []
  },
  {
    id: 'event-6',
    title: 'ISTE National Seminar on Prompt Engineering & GenAI',
    clubId: 'iste',
    clubName: 'ISTE (Technical Education)',
    description: 'Understand core LLM concepts and how to design effective prompts for building applications. Guest lecture from tech leaders.',
    date: getRelativeDateString(3), // In 3 days
    time: '15:00',
    duration: '2 Hours',
    venue: 'Seminar Hall 1 (Block A)',
    criteria: 'Open to all years and faculty members.',
    registrationType: 'internal',
    status: 'approved',
    featured: false,
    tags: ['AI', 'Generative AI', 'Online Workshop'],
    poster: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    registrants: []
  },
  {
    id: 'event-7',
    title: 'Western Group Dance Auditions - Stacatos',
    clubId: 'stacatos',
    clubName: 'Stacatos Dance Club',
    description: 'We are recruiting new talent for the upcoming inter-college youth festival! Prepare a 1-minute western or classical solo choreo of your choice.',
    date: getRelativeDateString(2),
    time: '16:00',
    duration: '2 Hours',
    venue: 'Cultural Activity Room, Block F',
    criteria: 'Bring your music track on a mobile/drive. Open to 1st and 2nd years.',
    registrationType: 'internal',
    status: 'approved',
    featured: false,
    tags: ['Dance', 'Auditions', 'Western'],
    poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    registrants: []
  },
  {
    id: 'event-8',
    title: 'Hostel Committee Table Tennis Championship',
    clubId: 'hostel_committee',
    clubName: 'Hostel Committee',
    description: 'Compete in the annual hostel singles table tennis showdown. Trophy and hostel canteen vouchers for the winners.',
    date: getRelativeDateString(3),
    time: '18:00',
    duration: '3 Hours',
    venue: 'Common Room, Hostel Block H-2',
    criteria: 'Exclusive to hostel boarders. Bring your own paddle if preferred.',
    registrationType: 'internal',
    status: 'approved',
    featured: false,
    tags: ['Sports', 'Hostel Life', 'Table Tennis'],
    poster: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    registrants: []
  },
  {
    id: 'event-9',
    title: 'Late Night Acoustic Rooftop Vibing Session',
    clubId: 'vibin_z',
    clubName: 'Vibin.Z Social Club',
    description: 'Grab a cup of hot tea and join Vibin.Z on the hostel rooftop for a cozy session of acoustic music, gossips, and soft card games under the stars.',
    date: getRelativeDateString(0), // Today (Live!)
    time: '21:30',
    duration: '3 Hours',
    venue: 'Terrace, Hostel Block H-1',
    criteria: 'Hostel residents only. Bring your vibe and an acoustic guitar if you play!',
    registrationType: 'internal',
    status: 'approved',
    featured: false,
    tags: ['Vibes', 'Hostel Life', 'Acoustic'],
    poster: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=800&q=80',
    registrants: []
  }
];

export const INITIAL_NOTICES = [
  {
    id: 'notice-1',
    type: 'flame',
    text: 'CodeSprint 2026: CS Lab hackathon is open! Teams can register up to 3 members.',
    date: 'June 23'
  },
  {
    id: 'notice-2',
    type: 'bell',
    text: 'Acoustic Jamming Night starts today at OAT at 5:30 PM. No registration required!',
    date: 'Today'
  },
  {
    id: 'notice-3',
    type: 'lightbulb',
    text: 'IEEE IoT smart devices Arduino workshop has limited seats left. Book your kit.',
    date: 'June 28'
  },
  {
    id: 'notice-4',
    type: 'award',
    text: 'DRAMA Club street play "Safar" starts near central fountain during lunch hour.',
    date: 'June 25'
  }
];

