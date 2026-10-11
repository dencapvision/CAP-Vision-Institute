// Shared server lookup: absence is different from an unavailable database.
export function isPublicSlug(slug) {
  return typeof slug === 'string' && slug.length <= 180 && /^[\p{L}\p{N}][\p{L}\p{N}\p{M}_-]*$/u.test(slug);
}
export async function loadPublishedRecord(client, table, slug, options = {}) {
  if (!isPublicSlug(slug)) return {status: 404, data: null};
  try {
    const {data, error} = await client.from(table).select(options.select || '*')
      .eq('slug', slug).eq(options.publishedColumn || 'published', true)
      .abortSignal(AbortSignal.timeout(options.timeoutMs || 5000)).maybeSingle();
    if (error) return {status: 503, data: null};
    return {status: data ? 200 : 404, data: data || null};
  } catch { return {status: 503, data: null}; }
}
export function normalizeDatabaseArticle(row) {
  if (!row || !row.content || typeof row.content !== 'object') return null;
  return {...row.content, title: row.title || row.content.title, slug: row.slug,
    category: row.category, thumbnail: row.thumbnail, author: row.author,
    date: row.date_label, readTime: row.read_time};
}
export function staticArticle(article) {
  return {id: article.id, slug: article.id, title: article.title, category: article.category || 'HRD Insight',
    thumbnail: article.thumbnail, author: 'ครูเด่น มาสเตอร์ฟา', date: article.date,
    readTime: '5 นาที', excerpt: article.excerpt, sections: [{type:'text', content:article.excerpt}]};
}
export async function resolveArticle(slug, {bundled = {}, fallback = [], lookup}) {
  if (!isPublicSlug(slug)) return {status:404, data:null};
  if (Object.hasOwn(bundled, slug)) return {status:200, data:bundled[slug]};
  const result = await lookup(slug);
  if (result.status === 200) {
    const data = normalizeDatabaseArticle(result.data);
    if (data?.title) return {status:200, data};
  }
  const article = fallback.find(a => a.id === slug);
  if (article) return {status:200, data:staticArticle(article)};
  return {status:result.status === 404 ? 404 : 503, data:null};
}
export function plainDescription(value) {
  return typeof value === 'string' ? value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim() : '';
}
export function articleMetadata(article) {
  return {title: article.seo?.meta_title || article.seo?.metaTitle || `${article.title} | CAP Vision Insight`,
    description: plainDescription(article.seo?.meta_description || article.seo?.metaDescription || article.summary || article.excerpt || article.title)};
}
