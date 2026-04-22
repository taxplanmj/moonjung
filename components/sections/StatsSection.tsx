'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Shield, Users, TrendingUp, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Counter animation hook ── */
function useCountUp(target: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;

        let startTime: number;
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(easeOutQuart(progress) * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return { count, ref };
}

/* ── Stats data ── */
const stats = [
    {
        label: '기장 고객사',
        value: 800,
        suffix: '+',
        icon: Shield,
        gradient: 'from-emerald-500 to-teal-500',
        lightBg: 'bg-emerald-500/10',
        description: '전 업종 세무기장 수행',
    },
    {
        label: '전문가 팀',
        value: 30,
        suffix: '명',
        icon: Users,
        gradient: 'from-blue-500 to-indigo-500',
        lightBg: 'bg-blue-500/10',
        description: '세무사·경영지도사',
    },
    {
        label: '정책자금 성공',
        value: 150,
        suffix: '건+',
        icon: TrendingUp,
        gradient: 'from-amber-500 to-orange-500',
        lightBg: 'bg-amber-500/10',
        description: '누적 승인 실적',
    },
];

export default function StatsSection() {
    return (
        <section className="relative overflow-hidden py-20 lg:py-28">
            {/* Background - stock market / IPO feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080e1a] via-[#0c1829] to-[#080e1a]" />

            {/* Trading terminal grid */}
            <div className="absolute inset-0" style={{
                backgroundImage:
                    'linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)',
                backgroundSize: '80px 60px',
            }} />

            {/* Stock chart - sharp upward trend */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="stockLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                        <stop offset="40%" stopColor="#10B981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
                {/* Filled area under chart */}
                <path
                    d="M0 480 L100 460 L180 470 L260 440 L340 450 L420 420 L500 430 L580 390 L660 400 L740 360 L820 340 L900 320 L980 280 L1060 240 L1140 200 L1220 160 L1300 120 L1380 80 L1440 50 L1440 600 L0 600 Z"
                    fill="url(#stockFill)"
                />
                {/* Main chart line */}
                <path
                    d="M0 480 L100 460 L180 470 L260 440 L340 450 L420 420 L500 430 L580 390 L660 400 L740 360 L820 340 L900 320 L980 280 L1060 240 L1140 200 L1220 160 L1300 120 L1380 80 L1440 50"
                    stroke="url(#stockLine)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinejoin="round"
                />
                {/* Glow dot at peak */}
                <circle cx="1440" cy="50" r="4" fill="#10B981" opacity="0.6" />
                <circle cx="1440" cy="50" r="8" fill="#10B981" opacity="0.2" />
                {/* Horizontal price levels */}
                <line x1="0" y1="200" x2="1440" y2="200" stroke="rgba(255,255,255,0.03)" strokeDasharray="8 8" />
                <line x1="0" y1="350" x2="1440" y2="350" stroke="rgba(255,255,255,0.03)" strokeDasharray="8 8" />
            </svg>

            {/* Green bullish glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-tl from-emerald-500/15 to-transparent rounded-full blur-[150px]" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-accent/8 rounded-full blur-[130px]" />

            <div className="section-container relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 rounded-full px-5 py-2 text-xs font-semibold mb-6">
                        <Award className="h-3.5 w-3.5" />
                        신뢰와 전문성
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
                        숫자가 증명하는{' '}
                        <span className="text-gradient bg-gradient-to-r from-accent to-amber-400">실력</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        800개 이상의 기장 경험, 30명의 전문가가 만드는 차이.
                    </p>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        const { count, ref } = useCountUp(stat.value);
                        return (
                            <div
                                key={stat.label}
                                ref={ref}
                                className={cn(
                                    'relative group text-center p-8 rounded-3xl',
                                    'bg-white/5 backdrop-blur-sm border border-white/10',
                                    'hover:bg-white/10 hover:border-white/20 hover:-translate-y-1',
                                    'transition-all duration-500'
                                )}
                            >
                                {/* Glow on hover */}
                                <div className={cn(
                                    'absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                                    stat.gradient.replace('from-', 'from-').replace('to-', 'to-'),
                                )} style={{ opacity: 0 }} />

                                <div className="relative z-10">
                                    <div className={cn(
                                        'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br text-white shadow-lg',
                                        stat.gradient
                                    )}>
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    <div className="text-5xl sm:text-6xl font-extrabold text-white mb-2 tabular-nums">
                                        {count}
                                        <span className="text-accent">{stat.suffix}</span>
                                    </div>
                                    <p className="text-lg font-bold text-white/80 mb-1">{stat.label}</p>
                                    <p className="text-sm text-white/40">{stat.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
