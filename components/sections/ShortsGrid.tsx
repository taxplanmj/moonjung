'use client';

import React from 'react';
import { Play, Clock, ExternalLink, Youtube, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCard {
    title: string;
    duration: string;
    summary: string;
    youtubeUrl: string;
    tags: string[];
    thumbnail: string;
    views: string;
}

const videos: VideoCard[] = [
    {
        title: '쿠팡 셀러 세금, 이것만 알면 됩니다',
        duration: '0:58',
        summary: '로켓그로스 수수료 처리부터 부가세 신고까지 핵심 정리',
        youtubeUrl: 'https://youtube.com',
        tags: ['쿠팡', '부가세'],
        thumbnail: '/images/thumb-1.png',
        views: '2.3만',
    },
    {
        title: '스마트스토어 개인→법인 전환 타이밍',
        duration: '1:12',
        summary: '매출 기준별 최적 전환 시점과 절세 효과 비교',
        youtubeUrl: 'https://youtube.com',
        tags: ['네이버', '법인전환'],
        thumbnail: '/images/thumb-2.png',
        views: '1.8만',
    },
    {
        title: '해외직구 관세 환급, 놓치지 마세요',
        duration: '0:45',
        summary: '수입 부가세·관세 환급 절차와 필요 서류 안내',
        youtubeUrl: 'https://youtube.com',
        tags: ['해외직구', '관세'],
        thumbnail: '/images/thumb-3.png',
        views: '1.5만',
    },
    {
        title: '정책자금 100% 활용 가이드',
        duration: '1:30',
        summary: '이커머스 사업자가 받을 수 있는 정책자금 총정리',
        youtubeUrl: 'https://youtube.com',
        tags: ['정책자금', '지원금'],
        thumbnail: '/images/thumb-4.png',
        views: '3.1만',
    },
    {
        title: '틱톡샵 크로스보더 세금 처리법',
        duration: '0:52',
        summary: '해외 플랫폼 정산금 매출 인식 및 신고 방법',
        youtubeUrl: 'https://youtube.com',
        tags: ['틱톡샵', '해외'],
        thumbnail: '/images/thumb-5.png',
        views: '9,800',
    },
    {
        title: '종합소득세 vs 법인세, 뭐가 유리할까?',
        duration: '1:05',
        summary: '매출 구간별 세금 시뮬레이션으로 최적 선택',
        youtubeUrl: 'https://youtube.com',
        tags: ['세금', '비교'],
        thumbnail: '/images/thumb-6.png',
        views: '2.7만',
    },
];

export default function ShortsGrid() {
    return (
        <section id="shorts" className="relative section-padding overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px]" />

            <div className="section-container relative z-10">
                {/* Section header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 rounded-full px-5 py-2 text-xs font-semibold mb-6">
                        <Youtube className="h-4 w-4" />
                        세무 꿀팁 영상
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                        1분 안에 핵심만,{' '}
                        <span className="text-gradient bg-gradient-to-r from-red-500 to-accent">
                            세무 Shorts
                        </span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        복잡한 세무 이슈를 짧고 명확하게 풀어드립니다.<br className="hidden sm:block" />
                        구독하고 최신 절세 팁을 놓치지 마세요.
                    </p>
                </div>

                {/* Video grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {videos.map((video, idx) => (
                        <a
                            key={idx}
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className={cn(
                                'relative rounded-3xl overflow-hidden',
                                'bg-white border border-gray-100',
                                'shadow-sm hover:shadow-2xl',
                                'hover:-translate-y-2 transition-all duration-500'
                            )}>
                                {/* Thumbnail area with real image */}
                                <div className="relative aspect-[9/12] overflow-hidden">
                                    {/* Actual thumbnail image */}
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* Gradient overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                                    {/* Play button - center */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={cn(
                                            'h-16 w-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30',
                                            'flex items-center justify-center',
                                            'group-hover:scale-110 group-hover:bg-accent/80 group-hover:border-accent/50 transition-all duration-300',
                                            'shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                        )}>
                                            <Play className="h-7 w-7 text-white fill-white ml-1" />
                                        </div>
                                    </div>

                                    {/* Duration badge */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        <Clock className="h-3 w-3" />
                                        {video.duration}
                                    </div>

                                    {/* Views badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                        <Sparkles className="h-3 w-3" />
                                        조회 {video.views}
                                    </div>

                                    {/* Bottom text on thumbnail */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h3 className="font-bold text-white text-lg mb-2 leading-snug line-clamp-2 group-hover:text-accent-200 transition-colors">
                                            {video.title}
                                        </h3>
                                        <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                                            {video.summary}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom bar */}
                                <div className="px-5 py-4 flex items-center justify-between bg-white">
                                    <div className="flex gap-2">
                                        {video.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={cn(
                                                    'text-xs font-semibold px-2.5 py-1 rounded-md',
                                                    'bg-gray-100 text-gray-600 group-hover:bg-accent/10 group-hover:text-accent transition-colors'
                                                )}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-accent transition-colors" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* YouTube CTA */}
                <div className="mt-14 text-center">
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'inline-flex items-center gap-3 px-8 py-4 rounded-2xl',
                            'bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm',
                            'shadow-lg hover:shadow-[0_8px_30px_rgba(220,38,38,0.35)]',
                            'hover:-translate-y-0.5 transition-all duration-300'
                        )}
                    >
                        <Youtube className="h-5 w-5" />
                        유튜브에서 더 보기
                        <ExternalLink className="h-4 w-4 opacity-60" />
                    </a>
                </div>
            </div>
        </section>
    );
}
