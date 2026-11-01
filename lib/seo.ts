import type { Metadata } from 'next';

interface SEOProps {
    title: string;
    description: string;
    path?: string;
    ogImage?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taxplanmj.com';

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

// JSON-LD: 사이트 이름(WebSite) — 검색결과에 표시될 이름과 대체 이름
export function getWebSiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '문정세무회계컨설팅',
        alternateName: ['문정세무회계', '문정세무', '문정회계', '문정동 세무'],
        url: SITE_URL,
    };
}

// JSON-LD: 세무회계 사무소(AccountingService) — 상호·로고·대표·위치
export function getLocalBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        '@id': `${SITE_URL}/#organization`,
        name: '문정세무회계컨설팅',
        alternateName: ['문정세무회계', '문정세무', '문정회계'],
        description:
            '서울 송파구 문정동 세무회계 사무소. 권민수 대표 세무사가 이커머스 셀러 기장·세무신고·절세·정책자금 컨설팅을 제공합니다.',
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}/icon-512.png`,
        telephone: '02-402-2353',
        email: 'taxplanmj@gmail.com',
        founder: { '@type': 'Person', name: '권민수', jobTitle: '세무사' },
        address: {
            '@type': 'PostalAddress',
            streetAddress: '법원로11길 11 문정현대지식산업센터 1차 A동 609~611호',
            addressLocality: '송파구 문정동',
            addressRegion: '서울특별시',
            postalCode: '05836',
            addressCountry: 'KR',
        },
        areaServed: [
            { '@type': 'Place', name: '서울특별시 송파구 문정동' },
            { '@type': 'Country', name: 'KR' },
        ],
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
