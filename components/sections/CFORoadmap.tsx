'use client';

import React from 'react';
import { FileText, BarChart3, Landmark, Building2, ArrowRight, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    {
        icon: FileText,
        step: 'STEP 01',
        title: '세무신고',
        subtitle: '기본을 탄탄하게',
        description: '부가세·종합소득세·법인세 정확한 신고와 절세 전략 수립',
        details: ['부가세·종합소득세 신고', '업종별 절세 전략', '전자 세금계산서 발행'],
        gradient: 'from-blue-500 to-cyan-500',
        bgGradient: 'from-blue-500/10 to-cyan-500/5',
        iconBg: 'bg-blue-500',
        ringColor: 'ring-blue-500/20',
        dotColor: 'bg-blue-500',
        lineColor: 'from-blue-500',
    },
    {
        icon: BarChart3,
        step: 'STEP 02',
        title: '재무구조',
        subtitle: '성장의 기반 설계',
        description: '원가분석, 손익관리, 현금흐름 최적화로 건강한 재무체질 구축',
        details: ['원가분석·손익관리', '현금흐름 최적화', '건강한 재무체질 구축'],
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'from-emerald-500/10 to-teal-500/5',
        iconBg: 'bg-emerald-500',
        ringColor: 'ring-emerald-500/20',
        dotColor: 'bg-emerald-500',
        lineColor: 'from-emerald-500',
    },
    {
        icon: Landmark,
        step: 'STEP 03',
        title: '정책자금',
        subtitle: '성장 자본 확보',
        description: '정부 지원금·정책자금·R&D 세액공제 등 활용 가능한 모든 혜택 연결',
        details: ['정부 지원금·정책자금', 'R&D 세액공제 활용', '활용 가능한 혜택 연결'],
        gradient: 'from-amber-500 to-orange-500',
        bgGradient: 'from-amber-500/10 to-orange-500/5',
        iconBg: 'bg-amber-500',
        ringColor: 'ring-amber-500/20',
        dotColor: 'bg-amber-500',
        lineColor: 'from-amber-500',
    },
    {
        icon: Building2,
        step: 'STEP 04',
        title: '기업성장',
        subtitle: '스케일업 파트너',
        description: '법인전환, M&A, 기업가치평가, 투자유치 자문까지 원스톱 지원',
        details: ['법인전환·M&A 자문', '기업가치평가', '투자유치 원스톱 지원'],
        gradient: 'from-purple-500 to-violet-500',
        bgGradient: 'from-purple-500/10 to-violet-500/5',
        iconBg: 'bg-purple-500',
        ringColor: 'ring-purple-500/20',
        dotColor: 'bg-purple-500',
        lineColor: 'from-purple-500',
    },
];

export default function CFORoadmap() {
    return (
        <section id="roadmap" className="relative section-padding overflow-hidden">
            {/* Dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e3a5f] to-primary" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            {/* Crosshatch overlay for visual depth */}
            <div className="absolute inset-0 crosshatch-pattern opacity-60" />
            {/* Decorative glow */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
            {/* Extra ambient highlights */}
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] bg-blue-400/5 rounded-full blur-[100px]" />

            <div className="section-container relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 rounded-full px-5 py-2 text-xs font-semibold mb-6">
                        <Rocket className="h-3.5 w-3.5" />
                        성장 로드맵
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
                        셀러에서 CEO로,{' '}
                        <br className="sm:hidden" />
                        <span className="text-gradient bg-gradient-to-r from-accent to-amber-400">
                            성장 파트너 로드맵
                        </span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        단순 기장을 넘어, 사업의 각 성장 단계에 맞는<br className="hidden sm:block" />
                        재무·세무 전략을 함께 설계합니다.
                    </p>
                </div>

                {/* Desktop: horizontal timeline */}
                <div className="hidden lg:block">
                    {/* Progress bar */}
                    <div className="relative max-w-5xl mx-auto mb-12">
                        <div className="h-1.5 bg-white/10 rounded-full">
                            <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-purple-500" />
                        </div>
                        {/* Dots on the progress bar */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-[calc(12.5%-8px)]">
                            {steps.map((step, idx) => (
                                <div key={idx} className={cn('w-5 h-5 rounded-full ring-4 ring-offset-2 ring-offset-[#1e3a5f]', step.dotColor, step.ringColor)} />
                            ))}
                        </div>
                    </div>

                    {/* Cards row */}
                    <div className="grid grid-cols-4 gap-5 max-w-5xl mx-auto">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group relative"
                                >
                                    <div className={cn(
                                        'relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm',
                                        'hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl',
                                        'transition-all duration-500'
                                    )}>
                                        {/* Hover glow */}
                                        <div className={cn(
                                            'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                                            step.bgGradient
                                        )} />

                                        <div className="relative z-10">
                                            {/* Step label */}
                                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
                                                {step.step}
                                            </span>

                                            {/* Icon */}
                                            <div className={cn(
                                                'inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 bg-gradient-to-br text-white shadow-lg',
                                                step.gradient
                                            )}>
                                                <Icon className="h-7 w-7" />
                                            </div>

                                            {/* Title & subtitle */}
                                            <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                                            <p className="text-sm font-medium text-accent-300 mb-4">{step.subtitle}</p>

                                            {/* Details list */}
                                            <ul className="space-y-2">
                                                {step.details.map((detail, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                                                        <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', step.dotColor)} />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile: vertical timeline */}
                <div className="lg:hidden space-y-6">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div key={idx} className="flex gap-5">
                                {/* Timeline line + dot */}
                                <div className="flex flex-col items-center">
                                    <div className={cn(
                                        'w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br shrink-0',
                                        step.gradient
                                    )}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className="w-0.5 flex-1 mt-3 bg-gradient-to-b from-white/20 to-transparent" />
                                    )}
                                </div>

                                {/* Content card */}
                                <div className="flex-1 pb-6">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                                        {step.step}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mt-1">{step.title}</h3>
                                    <p className="text-sm text-accent-300 font-medium mb-2">{step.subtitle}</p>
                                    <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 text-center">
                    <a
                        href="/consultation/"
                        className={cn(
                            'inline-flex items-center gap-3 px-8 py-4 rounded-2xl',
                            'bg-gradient-to-r from-accent to-accent-600 text-white font-bold text-sm',
                            'shadow-glow hover:shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:-translate-y-0.5',
                            'transition-all duration-300'
                        )}
                    >
                        나에게 맞는 성장 단계 확인하기
                        <ArrowRight className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
