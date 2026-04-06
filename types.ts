
export interface Instructor {
  id: string;
  slug: string;
  name: string;
  bio: string | null;
  image: string | null;
  title?: string;
  longBio?: string;
  expertise?: string[];
  achievements?: string[];
  socials?: { phone?: string; line?: string; [key: string]: any };
}

export interface Course {
  id: string;
  slug?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt_text?: string;
  long_description?: string;
  duration?: string;
  audience?: string;
  what_section?: any[] | null;
  why_section?: any[] | null;
  how_section?: any[] | null;
  objectives?: any[] | null;
  instructor_id?: string;
  instructor?: Instructor;
  is_published?: boolean;
}

export interface OnlineCourse {
  id: string;
  slug?: string;
  title: string;
  category: string;
  image: string;
  duration?: string;
  lessons?: number;
  price?: number;
  curriculum?: any[] | null;
  instructor_id?: string;
  instructor?: Instructor;
  progress?: number | null;
  is_published?: boolean;
}

export interface Event {
  id: string;
  title: string;
  event_date: string;
  location: string;
  link: string;
  speaker_id?: string;
  speaker?: Instructor;
  is_published?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Resource {
  id: string;
  type: 'blog' | 'video' | 'download';
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  category?: string;
  author?: string;
}

// Workshop Specific Types
export interface WheelData {
  career: number;
  finance: number;
  health: number;
  family: number;
  love: number;
  growth: number;
  leisure: number;
  contribution: number;
}

export interface ActionPlanRow {
  goal: string;
  steps: string[];
  timeline: string;
  support: string;
}

export interface GrowthRoadmapState {
  name: string;
  team: string;
  strengths: string[];
  gaps: string[];
  mainGoal: string;
  feeling: string;
  plans: ActionPlanRow[];
}

export interface Slide {
  id: number;
  title: string;
  content: string | React.ReactNode;
  theme: 'blue' | 'emerald' | 'orange' | 'dark' | 'gold';
  section?: string;
}

export type WorksheetType = 'wheel' | 'roadmap' | 'slides';

