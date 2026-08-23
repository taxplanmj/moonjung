'use client';

/**
 * 영상 + 블로그 콘텐츠를 각각 가로 스크롤 줄로 보여주는 섹션.
 *
 * 영상 줄은 아직 lib/content-data.ts의 정적 더미 데이터(유튜브 API 등
 * 미연동, docs/content-aggregation-plan.md 참고). 블로그 줄은 실제
 * 데이터입니다 — /api/blog/content-feed(Cloudflare Pages Function)에서
 * 자사 블로그(+ 나중에 네이버·티스토리) 최신 글을 클라이언트에서 fetch해서
 * 채웁니다. 정적 사이트라 빌드 시점에 구울 수 없어서 클라이언트 fetch로
 * 처리 — /blog와 동일한 이유(재배포 없이 항상 최신).
 *
 * 가로 스크롤 방식을 쓴 이유: 콘텐츠가 계속 늘어나는 구조라, 세로로
 * 쌓으면 모바일에서 페이지 길이가 무한정 길어짐. 가로 스크롤이면 콘텐츠가
 * 몇 개든 섹션 높이가 고정됨.
 */

import React, { useEffect, useState } from 'react';
import { Play, Clock, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import {
    videos,
    videoPlatformLabels,
    blogPlatformLabels,
    type BlogItem,
    type VideoPlatform,
    type BlogPlatform,
} from '@/lib/content-data';

const videoPlatformColor: Record<VideoPlatform, string> = {
    youtube: 'bg-red-50 text-red-600',
    tiktok: 'bg-pink-50 text-pink-600',
    instagram: 'bg-fuchsia-50 text-fuchsia-600',
    kakao: 'bg-[#FEE500]/20 text-amber-800',
    naver: 'bg-emerald-50 text-emerald-600',
};

const blogPlatformColor: Record<BlogPlatform, string> = {
    'naver-blog': 'bg-emerald-50 text-emerald-600',
    tistory: 'bg-slate-100 text-slate-600',
    'own-blog': 'bg-accent/10 text-accent-700',
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ScrollRow({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {children}
        </div>
    );
}

export default function ContentSection() {
    const [blogItems, setBlogItems] = useState<BlogItem[]>([]);

    useEffect(() => {
        fetch('/api/blog/content-feed')
            .then((res) => res.json() as Promise<BlogItem[]>)
            .then((data) => setBlogItems(data))
            .catch(() => setBlogItems([]));
    }, []);

    return (
        <section id="shorts" className="relative section-padding overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px]" />

            <div className="section-container relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 rounded-full px-5 py-2 text-xs font-semibold mb-6">
                        <Sparkles className="h-4 w-4" />
                        세무 콘텐츠
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                        사장님들이 가장 많이 본{' '}
                        <span className="text-gradient bg-gradient-to-r from-red-500 to-accent">
                            세무 이야기
                        </span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        여러 채널에 흩어진 세무 팁을 한곳에 모았습니다.
                    </p>
                </motion.div>

                {/* Video row */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-5">
                        <Play className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wide">영상</h3>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <ScrollRow>
                            {videos.map((video) => (
                                <motion.a
                                    key={video.id}
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    className="group block w-64 sm:w-72 shrink-0 snap-start"
                                >
                                    <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                                        <div className="relative aspect-[9/12] overflow-hidden">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/80 group-hover:border-accent/50 transition-all duration-300">
                                                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                                                </div>
                                            </div>

                                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Clock className="h-3 w-3" />
                                                {video.duration}
                                            </div>

                                            <div className={cn(
                                                'absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full',
                                                videoPlatformColor[video.platform]
                                            )}>
                                                {videoPlatformLabels[video.platform]}
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                <h4 className="font-bold text-white text-base mb-1.5 leading-snug line-clamp-2 group-hover:text-accent-200 transition-colors">
                                                    {video.title}
                                                </h4>
                                                <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                                                    {video.summary}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="px-4 py-3 flex items-center justify-between bg-white">
                                            <span className="text-xs text-gray-400">조회 {video.views}</span>
                                            <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </ScrollRow>
                    </motion.div>
                </div>

                {/* Blog row */}
                {blogItems.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-5">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wide">블로그</h3>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <ScrollRow>
                            {blogItems.map((post) => (
                                <motion.a
                                    key={post.id}
                                    href={post.url}
                                    target={post.url.startsWith('/') ? undefined : '_blank'}
                                    rel={post.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                                    variants={itemVariants}
                                    className="group block w-64 sm:w-72 shrink-0 snap-start"
                                >
                                    <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className={cn(
                                                'absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full',
                                                blogPlatformColor[post.platform]
                                            )}>
                                                {blogPlatformLabels[post.platform]}
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-gray-900 text-base mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h4>
                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-3">
                                                {post.excerpt}
                                            </p>
                                            <span className="text-xs text-gray-400">{post.readTime} 읽기</span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </ScrollRow>
                    </motion.div>
                </div>
                )}
            </div>
        </section>
    );
}
