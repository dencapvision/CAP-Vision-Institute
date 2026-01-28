
export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface OnlineCourse {
  id: string;
  title: string;
  category: string;
  image: string;
  progress: number | null;
  duration: string | null;
  lessons: number | null;
  instructor: string | null;
  price: number | null;
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
}
