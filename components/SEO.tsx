import { Helmet } from 'react-helmet-async';
import { HRD_FAQS, DEFAULT_SEO } from '../constants/seo';

// ===== TYPE DEFINITIONS =====
export type SEOSchemaType =
  | 'WebSite'
  | 'EducationalOrganization'
  | 'Course'
  | 'Article'
  | 'FAQPage'
  | 'BlogPosting';

interface CourseSchemaData {
  name: string;
  description: string;
  provider?: string;
  duration?: string;
  audience?: string;
}

interface ArticleSchemaData {
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: SEOSchemaType;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  // For Course schema
  courseData?: CourseSchemaData;
  // For Article schema
  articleData?: ArticleSchemaData;
  // Include global FAQ schema (for home/courses pages)
  includeFAQ?: boolean;
  // Breadcrumb items
  breadcrumb?: Array<{ name: string; url: string }>;
}

const ORG_DATA = {
  name: 'CAP Vision Institute',
  url: 'https://capvisionpartner.com',
  logo: 'https://capvisionpartner.com/logo.png',
  telephone: '+66-XX-XXXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'กรุงเทพมหานคร',
    addressCountry: 'TH',
  },
  sameAs: [
    'https://www.facebook.com/capvisioninstitute',
    'https://lin.ee/capvision',
  ],
};

export default function SEO({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  name = DEFAULT_SEO.author,
  type = 'WebSite',
  keywords = DEFAULT_SEO.keywords.split(', '),
  canonical,
  ogImage = DEFAULT_SEO.ogImage,
  noIndex = false,
  courseData,
  articleData,
  includeFAQ = false,
  breadcrumb,
}: SEOProps) {
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const keywordString = keywords.join(', ');

  // ===== JSON-LD: EducationalOrganization (always present) =====
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    ...ORG_DATA,
    description:
      'สถาบันพัฒนาศักยภาพผู้นำและฝึกอบรมครบวงจร ออกแบบหลักสูตร In-house Training สำหรับองค์กรไทย',
  };

  // ===== JSON-LD: Course (for course pages) =====
  const courseSchema = courseData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: courseData.name,
        description: courseData.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: courseData.provider || name,
          url: ORG_DATA.url,
        },
        hasCourseInstance: courseData.duration
          ? [
              {
                '@type': 'CourseInstance',
                courseMode: 'onsite',
                courseWorkload: courseData.duration,
                instructor: {
                  '@type': 'Person',
                  name: 'ครูเด่น มาสเตอร์ฟา',
                },
              },
            ]
          : undefined,
        audience: courseData.audience
          ? { '@type': 'Audience', audienceType: courseData.audience }
          : undefined,
      }
    : null;

  // ===== JSON-LD: Article/BlogPosting =====
  const articleSchema =
    articleData && (type === 'Article' || type === 'BlogPosting')
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: articleData.headline,
          description: articleData.description,
          image: articleData.image || ogImage,
          datePublished: articleData.datePublished || new Date().toISOString(),
          dateModified: articleData.dateModified || new Date().toISOString(),
          author: {
            '@type': 'Person',
            name: articleData.author || 'ครูเด่น มาสเตอร์ฟา',
          },
          publisher: {
            '@type': 'Organization',
            name: name,
            logo: { '@type': 'ImageObject', url: ORG_DATA.logo },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        }
      : null;

  // ===== JSON-LD: FAQPage (AEO target) =====
  const faqSchema = includeFAQ
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: HRD_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  // ===== JSON-LD: BreadcrumbList =====
  const breadcrumbSchema =
    breadcrumb && breadcrumb.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'หน้าหลัก',
              item: ORG_DATA.url,
            },
            ...breadcrumb.map((item, idx) => ({
              '@type': 'ListItem',
              position: idx + 2,
              name: item.name,
              item: item.url,
            })),
          ],
        }
      : null;

  return (
    <Helmet>
      {/* ---- Standard Meta ---- */}
      <title>{title} | {name}</title>
      <meta name="description" content={description} />
      {keywordString && <meta name="keywords" content={keywordString} />}
      {canonical && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ---- Language ---- */}
      <meta httpEquiv="Content-Language" content="th" />
      <html lang="th" />

      {/* ---- Open Graph ---- */}
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content={type === 'Article' || type === 'BlogPosting' ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="th_TH" />

      {/* ---- Twitter Card ---- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@capvisioninstitute" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ---- JSON-LD Schemas ---- */}
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>

      {courseSchema && (
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      )}

      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}
