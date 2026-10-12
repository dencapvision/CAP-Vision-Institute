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

import {supabase} from '../supabase';
export async function generateArticle(title:string,context=''):Promise<GeneratedArticle>{
 const {data:{session}}=await supabase.auth.getSession();if(!session)throw Error('กรุณาเข้าสู่ระบบก่อนสร้างบทความ');
 const response=await fetch('/api/admin-article',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({title,context}),signal:AbortSignal.timeout(45000)});
 const data=await response.json();if(!response.ok||!data.article)throw Error(data.error||'สร้างบทความไม่สำเร็จ');return data.article;
}
