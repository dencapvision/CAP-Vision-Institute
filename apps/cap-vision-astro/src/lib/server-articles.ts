import { supabase } from './supabase';
import { HRD_ARTICLES } from '../constants/articles';
import { loadPublishedRecord, resolveArticle } from './public-content.mjs';
// These JSON files match public/content/blog/posts; bundle them for Worker SSR.
const files = import.meta.glob('../data/blog/posts/*.json', {eager: true, import: 'default'});
const bundled = Object.fromEntries(Object.entries(files).map(([path, article]) => [path.split('/').pop()!.replace(/\.json$/, ''), article]));
export const loadServerArticle = (slug: string) => resolveArticle(slug, {
  bundled, fallback: HRD_ARTICLES,
  lookup: value => loadPublishedRecord(supabase, 'blog_articles', value)
});
