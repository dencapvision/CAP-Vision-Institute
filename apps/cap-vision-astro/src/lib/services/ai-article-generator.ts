import { invokeAIGeneration } from './ai-client';

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  title: string;
  description: string;
}

export interface ArticleSEO {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  summary: string;
  context: string;
  insight: string;
  framework: string[];
  application: string;
  case_study: string;
  takeaways: string[];
  faq: ArticleFAQ[];
  cta: string;
  seo: ArticleSEO;
  hashtags: string[];
  images: ArticleImage[];
}

export async function generateArticle(title: string, context?: string): Promise<GeneratedArticle> {
  return invokeAIGeneration<GeneratedArticle>('article', { title, context });
}
