import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import '@/styles/globals.css';

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-noto-sans-kr',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: '문정세무회계컨설팅 | 이커머스 셀러 전문 세무 파트너',
        template: '%s | 문정세무회계컨설팅',
    },
    description:
        '쿠팡, 네이버, 자사몰, 해외직구, 틱톡샵 셀러를 위한 전문 세무·회계·컨설팅 서비스. 800+기장 고객, 30명 전문가, 경영지도사 대표 직접 상담.',
    keywords: [
        '이커머스 세무',
        '쿠팡 셀러 세무',
        '네이버 스마트스토어 세금',
        '온라인 셀러 기장',
        '세무회계 컨설팅',
        '정책자금',
        '문정세무',
    ],
    authors: [{ name: '문정세무회계컨설팅' }],
    creator: '문정세무회계컨설팅',
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: 'https://moomjung.co.kr',
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
                <link rel="icon" href="/icon-192.png" type="image/png" />
            </head>
            <body className="min-h-screen bg-white antialiased">
                <Header />
                <main className="pb-bottom-nav">{children}</main>
                <BottomNav />
            </body>
        </html>
    );
}
