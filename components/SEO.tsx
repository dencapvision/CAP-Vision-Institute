import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
}

export default function SEO({ title, description, name = 'CAP Vision Institute', type = 'website' }: SEOProps) {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title} | {name}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={window.location.href} />

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={window.location.href} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            {/* JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": type === 'article' ? 'BlogPosting' : 'Organization',
                    "name": name,
                    "description": description,
                    "url": window.location.href
                })}
            </script>
        </Helmet>
    );
}
