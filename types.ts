
export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
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
