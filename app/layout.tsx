import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/sections/Footer';
import '@/styles/globals.css';

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-noto-sans-kr',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://taxplanmj.com'),
    title: {
        default: '문정세무회계컨설팅 | 문정동 세무사 · 이커머스 셀러 전문 세무회계',
        template: '%s | 문정세무회계컨설팅',
    },
    description:
        '문정세무회계컨설팅은 서울 송파구 문정동에 위치한 세무회계 사무소입니다. 권민수 대표 세무사가 쿠팡·네이버·자사몰·해외직구·틱톡샵 셀러의 기장, 부가세·종합소득세 신고, 절세, 정책자금 컨설팅을 직접 상담합니다.',
    keywords: [
        '문정세무회계컨설팅',
        '문정세무회계',
        '문정세무',
        '문정회계',
        '문정동 세무',
        '문정동 세무사',
        '문정동 세무사 사무실',
        '권민수 세무사',
        '이커머스 세무',
        '쿠팡 셀러 세무',
        '네이버 스마트스토어 세금',
        '온라인 셀러 기장',
        '정책자금',
    ],
    authors: [{ name: '문정세무회계컨설팅' }],
    creator: '문정세무회계컨설팅',
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://taxplanmj.com',
        siteName: '문정세무회계컨설팅',
        title: '문정세무회계컨설팅 | 이커머스 셀러 전문 세무 파트너',
        description:
            '쿠팡, 네이버, 자사몰, 해외직구, 틱톡샵 셀러를 위한 전문 세무·회계·컨설팅.',
    },
    twitter: {
        card: 'summary_large_image',
        title: '문정세무회계컨설팅',
        description: '이커머스 셀러 전문 세무 파트너',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#1B2A4A',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={notoSansKr.variable}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png" />
                <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
                <link rel="apple-touch-icon" href="/icon-192.png" />
            </head>
            <body className="min-h-screen bg-white antialiased">
                <Header />
                <div className="pb-bottom-nav">
                    <main>{children}</main>
                    <Footer />
                </div>
                <BottomNav />
            </body>
        </html>
    );
}
