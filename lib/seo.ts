import type { Metadata } from 'next';

interface SEOProps {
    title: string;
    description: string;
    path?: string;
    ogImage?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://moomjung.co.kr';

export function generateSEOMeta({ title, description, path = '', ogImage }: SEOProps): Metadata {
    const url = `${SITE_URL}${path}`;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: '문정세무회계컨설팅',
            locale: 'ko_KR',
            type: 'website',
            ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: { canonical: url },
    };
}

// JSON-LD: LocalBusiness
export function getLocalBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: '문정세무회계컨설팅',
        description: '이커머스 셀러 전문 세무·회계·컨설팅 서비스',
        url: SITE_URL,
        telephone: '02-402-2353',
        email: 'taxplanmj@gmail.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '법원로11길 11 문정현대지식산업센터 1차 A동 609~611호',
            addressLocality: '송파구',
            addressRegion: '서울특별시',
            postalCode: '05836',
            addressCountry: 'KR',
        },
        areaServed: { '@type': 'Country', name: 'KR' },
        priceRange: '₩₩',
    };
}

// JSON-LD: FAQPage
export function getFAQJsonLd(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };
}
