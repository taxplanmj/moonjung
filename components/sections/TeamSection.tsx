'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Landmark, RotateCcw, Wallet, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProblemColor {
    buttonInactive: string;
    buttonActive: string;
    icon: string;
    title: string;
    solutionBg: string;
    solutionBorder: string;
    solutionText: string;
    progressFill: string;
}

interface ProblemTab {
    id: string;
    tabLabel: string;
    icon: React.ElementType;
    photo: string;
    hook: string;
    diagnosis: string;
    /** exact substring inside `diagnosis` to highlight in the tab color */
    emphasis: string;
    solution: string;
    color: ProblemColor;
}

/* 실제 대표님 사진(problem별 컷)이 준비되면 photo 경로만 채워 넣으면 자동 반영됩니다.
   해당 파일이 없으면 기본 프로필 사진(team-kwon.png)으로 자동 대체됩니다. */
const problems: ProblemTab[] = [
    {
        id: 'cashflow',
        tabLabel: '현금흐름',
        icon: Wallet,
        photo: '/images/team-kwon-cashflow.png',
        hook: '"이익은 나는데, 통장엔 돈이 없다"',
        diagnosis: '정산은 늦게 들어오는데 사입비·인건비·세금은 먼저 나가는 구조 때문입니다. 매출이 늘어도 현금은 오히려 빠듯해지는 \'돈맥경화\' 상태가 되기 쉽습니다.',
        emphasis: "'돈맥경화' 상태",
        solution: '회계상 이익이 아닌 실질 현금흐름 기준으로 자금 스케줄을 진단하고, 플랫폼 정산 주기에 맞춘 세무·자금 계획을 제시합니다.',
        color: {
            buttonInactive: 'bg-blue-50 border border-blue-200 text-blue-700',
            buttonActive: 'bg-blue-100 border-2 border-blue-400 text-blue-800',
            icon: 'text-blue-500',
            title: 'text-blue-700',
            solutionBg: 'bg-blue-500/5',
            solutionBorder: 'border-blue-500/20',
            solutionText: 'text-blue-600',
            progressFill: 'bg-blue-500',
        },
    },
    {
        id: 'returns',
        tabLabel: '반품·재고',
        icon: RotateCcw,
        photo: '/images/team-kwon-returns.png',
        hook: '"반품·교환 비용까지 넣고 이익률을 계산해보셨나요?"',
        diagnosis: '반품 왕복 배송비, 재포장, 재판매 불가 손실, 안 팔리는 부진재고의 보관비는 단순 매출-원가 계산엔 잘 안 잡힙니다. 실제 수익성은 생각보다 훨씬 낮을 수 있습니다.',
        emphasis: '생각보다 훨씬 낮을 수 있습니다',
        solution: '플랫폼별 반품률과 재고회전율까지 반영한 실질 원가·수익성 진단으로 진짜 남는 사업인지 짚어드립니다.',
        color: {
            buttonInactive: 'bg-emerald-50 border border-emerald-200 text-emerald-700',
            buttonActive: 'bg-emerald-100 border-2 border-emerald-400 text-emerald-800',
            icon: 'text-emerald-500',
            title: 'text-emerald-700',
            solutionBg: 'bg-emerald-500/5',
            solutionBorder: 'border-emerald-500/20',
            solutionText: 'text-emerald-600',
            progressFill: 'bg-emerald-500',
        },
    },
    {
        id: 'taxsaving',
        tabLabel: '절세 노하우',
        icon: ShieldCheck,
        photo: '/images/team-kwon-taxsaving.png',
        hook: '"세금, 혹시 그냥 다 내고 계신가요?"',
        diagnosis: '절세 가능한 항목을 몰라서 낼 필요 없는 세금까지 내는 사장님이 의외로 많습니다. 절세는 탈세가 아니라, 법이 허용하는 정당한 권리입니다.',
        emphasis: '법이 허용하는 정당한 권리',
        solution: '합법적인 범위 안에서 활용할 수 있는 다양한 절세 방법과 노하우로, 정당하게 아낄 수 있는 세금을 놓치지 않게 도와드립니다.',
        color: {
            buttonInactive: 'bg-violet-50 border border-violet-200 text-violet-700',
            buttonActive: 'bg-violet-100 border-2 border-violet-400 text-violet-800',
            icon: 'text-violet-500',
            title: 'text-violet-700',
            solutionBg: 'bg-violet-500/5',
            solutionBorder: 'border-violet-500/20',
            solutionText: 'text-violet-600',
            progressFill: 'bg-violet-500',
        },
    },
    {
        id: 'policy',
        tabLabel: '정책자금',
        icon: Landmark,
        photo: '/images/team-kwon-policy.png',
        hook: '"받을 수 있는 지원금, 놓치고 계신 건 아닌가요?"',
        diagnosis: '정책자금·R&D는 신청 요건과 시기를 모르면 자격이 있어도 놓치기 쉽습니다. 대부분의 셀러가 본인이 대상자인지조차 모르고 지나갑니다.',
        emphasis: '자격이 있어도 놓치기 쉽습니다',
        solution: '경영지도사 자격을 가진 대표가 사업 현황에 맞는 정책자금·R&D 과제를 직접 매칭하고 신청까지 지원합니다.',
        color: {
            buttonInactive: 'bg-amber-50 border border-amber-200 text-amber-700',
            buttonActive: 'bg-amber-100 border-2 border-amber-400 text-amber-800',
            icon: 'text-amber-500',
            title: 'text-amber-700',
            solutionBg: 'bg-amber-500/5',
            solutionBorder: 'border-amber-500/20',
            solutionText: 'text-amber-600',
            progressFill: 'bg-amber-500',
        },
    },
];

/** diagnosis 문장 중 emphasis에 해당하는 부분만 tab 컬러로 강조 표시 */
function HighlightedDiagnosis({ text, emphasis, colorClass }: { text: string; emphasis: string; colorClass: string }) {
    const idx = text.indexOf(emphasis);
    if (idx === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, idx)}
            <strong className={cn('font-bold', colorClass)}>{emphasis}</strong>
            {text.slice(idx + emphasis.length)}
        </>
    );
}

const AUTO_ROTATE_MS = 5000;

const tabContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const tabItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function TeamSection() {
    const [activeId, setActiveId] = useState(problems[0].id);
    const [isPaused, setIsPaused] = useState(false); // true once the visitor manually picks a tab — stops autoplay for good
    const [isHovered, setIsHovered] = useState(false); // temporary pause while reading
    const [isInView, setIsInView] = useState(false); // only start autoplay once the section is actually visible
    const [cycleId, setCycleId] = useState(0); // bumped every time a fresh 8s countdown starts, to restart the progress bar

    const active = problems.find((p) => p.id === activeId)!;
    const isAutoPlaying = !isPaused && !isHovered && isInView;

    // auto-advance to the next tab every AUTO_ROTATE_MS, unless paused/hovered/out of view
    useEffect(() => {
        if (!isAutoPlaying) return undefined;
        setCycleId((c) => c + 1);
        const timer = setTimeout(() => {
            setActiveId((current) => {
                const idx = problems.findIndex((p) => p.id === current);
                return problems[(idx + 1) % problems.length].id;
            });
        }, AUTO_ROTATE_MS);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId, isAutoPlaying]);

    const handleTabClick = (id: string) => {
        setIsPaused(true);
        setActiveId(id);
    };

    return (
        <section id="team" className="relative py-20 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px]" />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    onViewportEnter={() => setIsInView(true)}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
                        <Zap className="h-3.5 w-3.5" />
                        전문가 팀
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                        이커머스에 진심인{' '}
                        <span className="text-gradient bg-gradient-to-r from-accent to-accent-400">전문가들</span>
                    </h3>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        사장님들이 놓치기 쉬운 문제, 저희는 미리 알고 있습니다.
                    </p>
                </motion.div>

                {/* Problem selector tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-10"
                    variants={tabContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {problems.map((problem) => {
                        const Icon = problem.icon;
                        const isActive = activeId === problem.id;
                        return (
                            <motion.div key={problem.id} variants={tabItemVariants} className="relative">
                                <button
                                    type="button"
                                    onClick={() => handleTabClick(problem.id)}
                                    className={cn(
                                        'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 w-full',
                                        isActive ? problem.color.buttonActive : cn(problem.color.buttonInactive, 'opacity-70 hover:opacity-100')
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{problem.tabLabel}</span>
                                </button>
                                {/* Auto-rotate progress bar — fills up over AUTO_ROTATE_MS, only on the active tab */}
                                {isActive && isAutoPlaying && (
                                    <div className="absolute left-1.5 right-1.5 -bottom-2 h-1 rounded-full bg-gray-200/80 overflow-hidden">
                                        <motion.div
                                            key={cycleId}
                                            className={cn('h-full rounded-full', problem.color.progressFill)}
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: AUTO_ROTATE_MS / 1000, ease: 'linear' }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Representative spotlight card */}
                <motion.div
                    className="max-w-5xl mx-auto rounded-3xl border border-gray-100 shadow-xl overflow-hidden bg-white grid lg:grid-cols-[360px_1fr]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Photo — crossfades with the active problem */}
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={active.id}
                                src={active.photo}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/team-kwon.png';
                                }}
                                alt="권민수 대표 세무사"
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                loading="lazy"
                                decoding="async"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                            <h4 className="font-bold text-white text-xl mb-0.5">권민수</h4>
                            <p className="text-sm text-white/70">대표 세무사 · 세무사 · 경영지도사</p>
                        </div>
                    </div>

                    {/* Content — switches with the active problem */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center min-h-[420px]">
                        <div className="hidden lg:block mb-6">
                            <p className="text-sm font-semibold text-accent mb-1">대표 세무사</p>
                            <h4 className="text-2xl lg:text-3xl font-extrabold text-primary mb-1">권민수</h4>
                            <p className="text-sm text-gray-400">세무사 · 경영지도사</p>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <active.icon className={cn('h-4 w-4', active.color.icon)} />
                                    <span className={cn('text-xs font-bold uppercase tracking-wide', active.color.title)}>이런 고민, 있으신가요?</span>
                                </div>
                                <p className={cn('text-lg lg:text-xl font-extrabold mb-3 leading-snug', active.color.title)}>
                                    {active.hook}
                                </p>
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-5">
                                    <HighlightedDiagnosis text={active.diagnosis} emphasis={active.emphasis} colorClass={active.color.title} />
                                </p>

                                <div className={cn('rounded-2xl p-4 sm:p-5 border', active.color.solutionBg, active.color.solutionBorder)}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className={cn('h-4 w-4', active.color.solutionText)} />
                                        <span className={cn('text-xs font-bold', active.color.solutionText)}>문정의 진단과 솔루션</span>
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                                        {active.solution}
                                    </p>
                                    <Link
                                        href="/consultation/"
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-600 transition-colors"
                                    >
                                        이 문제, 무료로 진단받기
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Team size note */}
                <motion.p
                    className="text-center text-sm text-gray-400 mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    그 외 세무사 · 경영지도사 등 전문가 <span className="text-primary font-bold">30명</span>이 함께합니다.
                </motion.p>
            </div>
        </section>
    );
}
