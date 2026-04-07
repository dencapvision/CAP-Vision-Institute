import type { GeneratedArticle } from '../services/ai-article-generator';

export interface SEOResult {
  score: number;
  issues: string[];
  suggestions: string[];
  passed: string[];
}

export function analyzeSEO(a: Partial<GeneratedArticle>): SEOResult {
  const issues: string[] = [], suggestions: string[] = [], passed: string[] = [];
  let score = 0;

  // Meta Title (15 pts)
  if (a.seo?.meta_title) {
    const l = a.seo.meta_title.length;
    if (l <= 60) { score += 15; passed.push(`Meta Title ✓ (${l} ตัว)`); }
    else { score += 8; suggestions.push(`Meta Title ยาว ${l} ตัว (ควร ≤60)`); }
  } else issues.push('ไม่มี Meta Title');

  // Meta Description (15 pts)
  if (a.seo?.meta_description) {
    const l = a.seo.meta_description.length;
    if (l >= 130 && l <= 165) { score += 15; passed.push(`Meta Description ✓ (${l} ตัว)`); }
    else if (l < 130) { score += 7; suggestions.push(`Meta Description สั้นเกินไป (${l} ตัว ควร 130-165)`); }
    else { score += 8; suggestions.push(`Meta Description ยาวเกินไป (${l} ตัว)`); }
  } else issues.push('ไม่มี Meta Description');

  // Keywords (10 pts)
  const kwCount = a.seo?.keywords?.length ?? 0;
  if (kwCount >= 5) { score += 10; passed.push(`Keywords ✓ (${kwCount} คำ)`); }
  else { score += kwCount * 2; suggestions.push(`มี Keywords ${kwCount} คำ (ควร ≥5)`); }

  // Summary AEO (15 pts)
  const sumLen = a.summary?.length ?? 0;
  if (sumLen >= 100) { score += 15; passed.push('Summary ✓ Answer-first AEO'); }
  else if (sumLen > 0) { score += 7; suggestions.push(`Summary สั้นเกินไป (${sumLen} ตัว ควร ≥100)`); }
  else issues.push('ไม่มี Summary — สำคัญมากสำหรับ AEO');

  // FAQ (15 pts)
  const faqCount = a.faq?.length ?? 0;
  if (faqCount >= 3) { score += 15; passed.push(`FAQ ✓ ${faqCount} ข้อ (JSON-LD ready)`); }
  else if (faqCount > 0) { score += 5; suggestions.push(`FAQ แค่ ${faqCount} ข้อ (ควร ≥3)`); }
  else issues.push('ไม่มี FAQ — ขาด AEO schema');

  // Framework (10 pts)
  const fwCount = a.framework?.length ?? 0;
  if (fwCount >= 3) { score += 10; passed.push(`Framework ✓ ${fwCount} ขั้นตอน`); }
  else suggestions.push(`Framework มีแค่ ${fwCount} ขั้น (ควร ≥3)`);

  // Case Study (10 pts)
  if ((a.case_study?.length ?? 0) > 80) { score += 10; passed.push('Case Study ✓'); }
  else suggestions.push('เพิ่ม Case Study จากองค์กรจริง');

  // Image (5 pts)
  if (a.images?.length) { score += 5; passed.push('Thumbnail ✓'); }
  else suggestions.push('เพิ่ม Thumbnail image');

  // CTA (5 pts)
  if ((a.cta?.length ?? 0) > 20) { score += 5; passed.push('CTA ✓'); }
  else suggestions.push('เพิ่ม Call-to-Action');

  return { score: Math.min(100, score), issues, suggestions, passed };
}

export const scoreColor = (s: number) =>
  s >= 80 ? 'text-green-600' : s >= 60 ? 'text-amber-500' : 'text-red-500';

export const scoreBg = (s: number) =>
  s >= 80 ? 'bg-green-100 text-green-700' : s >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600';

export const scoreLabel = (s: number) =>
  s >= 80 ? 'พร้อม Publish' : s >= 60 ? 'ควรปรับก่อน' : 'ต้องปรับปรุง';
