'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, Variants } from 'framer-motion';

const trustBadges = [
    { icon: Shield, label: '800+ 기장 고객사', color: 'text-emerald-400' },
    { icon: Users, label: '30명 전문가 팀', color: 'text-blue-400' },
    { icon: Award, label: '경영지도사 대표', color: 'text-amber-400' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
        },
    },
};


export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
            {/* Background image */}
            <img
                src="/images/hero-bg.png"
                alt=""
                role="presentation"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Floating gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent/15 rounded-full blur-[100px] animate-pulse-soft" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-soft delay-500" />


            <motion.div
                className="section-container relative z-10 py-32 lg:py-40"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
                    {/* Eyebrow badge */}
                    <motion.div variants={itemVariants}>
                        <Badge variant="accent" className="mb-6 bg-accent/20 text-accent-300 border-accent/30 px-4 py-1.5 text-xs">
                            🔥 이커머스 셀러 전문 세무 파트너
                        </Badge>
                    </motion.div>

                    {/* Main headline */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight"
                        variants={itemVariants}
                    >
                        매출은 올리고,{' '}
                        <br className="hidden sm:block" />
                        세금은{' '}
                        <span className="text-gradient bg-gradient-to-r from-accent to-accent-300">
                            전략적으로
                        </span>
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
                        style={{ wordBreak: 'keep-all' }}
                        variants={itemVariants}
                    >
                        쿠팡·틱톡샵·네이버·해외직구·자사몰 셀러를 위한
                        <br />
                        <strong className="text-white">원스톱 세무·회계·컨설팅</strong>, 세무신고부터 정책자금·기업성장까지 함께합니다.
                    </motion.p>

                    {/* Trust badges */}
                    <motion.div
                        className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
                        variants={itemVariants}
                    >
                        {trustBadges.map((badge) => {
                            const Icon = badge.icon;
                            return (
                                <div
                                    key={badge.label}
                                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                                >
                                    <Icon className={`h-4 w-4 ${badge.color}`} />
                                    <span className="text-sm text-white/90 font-medium">{badge.label}</span>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        variants={itemVariants}
                    >
                        <Link href="/consultation/">
                            <Button variant="accent" size="xl" className="w-full sm:w-auto shadow-glow">
                                세무 진단 받기
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" size="xl" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white">
                                <Play className="mr-2 h-5 w-5" />
                                유튜브 핵심 팁
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
