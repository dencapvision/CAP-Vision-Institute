/**
 * Generate URL-safe slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove non-word chars
    .replace(/[\s_-]+/g, '-')   // replace spaces/underscores with -
    .replace(/^-+|-+$/g, '')    // trim leading/trailing -
}

/**
 * Generate meta description from content (first 155 chars)
 */
export function autoMetaDescription(content: string): string {
  const stripped = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return stripped.length > 155 ? stripped.slice(0, 152) + '...' : stripped
}

/**
 * Build JSON-LD for Article
 */
export function buildArticleJsonLd(data: {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: data.url,
    image: data.imageUrl,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: { '@type': 'Person', name: data.authorName ?? 'CAP Vision Institute' },
    publisher: {
      '@type': 'Organization',
      name: 'CAP Vision Institute',
      logo: { '@type': 'ImageObject', url: 'https://capvisionpartner.com/images/logo.png' },
    },
  }
}

/**
 * Build JSON-LD for Person (Speaker)
 */
export function buildPersonJsonLd(data: {
  name: string
  jobTitle?: string
  description?: string
  url?: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    url: data.url,
    image: data.imageUrl,
    worksFor: { '@type': 'Organization', name: 'CAP Vision Institute' },
  }
}

/**
 * Build JSON-LD for Event
 */
export function buildEventJsonLd(data: {
  name: string
  description?: string
  startDate: string
  location?: string
  url?: string
  isOnline?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    location: data.isOnline
      ? { '@type': 'VirtualLocation', url: data.url }
      : { '@type': 'Place', name: data.location ?? 'Thailand' },
    organizer: { '@type': 'Organization', name: 'CAP Vision Institute' },
    url: data.url,
  }
}

/**
 * Build JSON-LD for Course
 */
export function buildCourseJsonLd(data: {
  name: string
  description?: string
  url?: string
  providerName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.name,
    description: data.description,
    url: data.url,
    provider: { '@type': 'Organization', name: data.providerName ?? 'CAP Vision Institute' },
  }
}
