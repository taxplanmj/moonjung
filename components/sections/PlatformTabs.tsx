'use client';

import React, { useState } from 'react';
import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import { CoupangLogo, TiktokLogo, NaverLogo, OverseasIcon, OwnMallIcon } from '@/components/icons/PlatformLogos';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface PlatformData {
    id: string;
    name: string;
    icon: React.ElementType;
    gradient: string;
    lightBg: string;
    borderColor: string;
    iconColor: string;
    accentDot: string;
    issues: { title: string; description: string }[];
    process: string[];
}

const platforms: PlatformData[] = [
    {
        id: 'coupang',
        name: '쿠팡',
        icon: CoupangLogo,
        gradient: 'from-red-500 to-rose-600',
        lightBg: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        accentDot: 'bg-red-500',
        issues: [
            { title: '로켓그로스 수수료 처리', description: '복잡한 수수료 구조를 정확히 비용처리하여 세금 절감' },
            { title: '재고 자산 평가', description: 'FBA 보관 재고의 세법상 올바른 자산 평가 방법' },
            { title: '매출 정산 시점 이슈', description: '정산일과 귀속시기 차이로 인한 신고 오류 방지' },
        ],
        process: ['매출/정산 데이터 수집', '수수료 항목별 분류', '절세 포인트 도출', '신고 및 모니터링'],
    },
    {
        id: 'tiktok',
        name: '틱톡샵',
        icon: TiktokLogo,
        gradient: 'from-pink-500 to-rose-500',
        lightBg: 'bg-pink-50',
        borderColor: 'border-pink-200',
        iconColor: 'text-pink-600',
        accentDot: 'bg-pink-500',
        issues: [
            { title: '크로스보더 정산', description: '해외 플랫폼 정산금의 올바른 매출 인식' },
            { title: '인플루언서 수수료', description: '어필리에이트 수수료의 세무 처리 방법' },
            { title: '라이브커머스 매출', description: '실시간 판매의 매출 귀속 시기 및 신고' },
        ],
        process: ['정산 데이터 확보', '매출 귀속 정리', '수수료 비용화', '신고 완료'],
    },
    {
        id: 'naver',
        name: '네이버',
        icon: NaverLogo,
        gradient: 'from-green-500 to-emerald-600',
        lightBg: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        accentDot: 'bg-green-500',
        issues: [
            { title: '스마트스토어 매출 신고', description: '간이/일반 과세 전환 시점 및 부가세 신고 최적화' },
            { title: '네이버페이 정산 관리', description: '수수료·광고비·정산금 체계적 관리로 누락 방지' },
            { title: '사업자 전환 전략', description: '개인→법인 전환 타이밍과 세금 영향 분석' },
        ],
        process: ['스토어 매출 분석', '과세 유형 진단', '최적 신고 전략', '분기별 리뷰'],
    },
    {
        id: 'overseas',
        name: '해외직구',
        icon: OverseasIcon,
        gradient: 'from-blue-500 to-indigo-600',
        lightBg: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        accentDot: 'bg-blue-500',
        issues: [
            { title: '관세·부가세 환급', description: '수입 시 납부한 관세·부가세 정확한 환급 처리' },
            { title: '환율 차손익 처리', description: '외화 거래의 환율 변동에 따른 세무 처리' },
            { title: '해외 결제 증빙', description: 'PayPal·해외카드 결제의 적격증빙 관리' },
        ],
        process: ['수입 내역 정리', '관세 환급 신청', '환율 정산', '종합소득세 신고'],
    },
    {
        id: 'own-mall',
        name: '자사몰',
        icon: OwnMallIcon,
        gradient: 'from-violet-500 to-purple-600',
        lightBg: 'bg-violet-50',
        borderColor: 'border-violet-200',
        iconColor: 'text-violet-600',
        accentDot: 'bg-violet-500',
        issues: [
            { title: 'PG사 수수료 관리', description: '다양한 PG사별 수수료 정확한 비용 처리' },
            { title: '카드매출 vs 현금영수증', description: '결제수단별 매출 신고 및 세액공제 최적화' },
            { title: '마케팅 비용 처리', description: 'SNS 광고·인플루언서 비용의 적격증빙 확보' },
        ],
        process: ['매출 채널 통합', '비용 항목 정리', '증빙 체계 구축', '세무 최적화'],
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
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

export default function PlatformTabs() {
    const [activeTab, setActiveTab] = useState('coupang');
    const activePlatform = platforms.find((p) => p.id === activeTab)!;
    const ActiveIcon = activePlatform.icon;

    return (
        <section id="services" className="relative section-padding overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />

            <div className="section-container relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
                        <Sparkles className="h-3.5 w-3.5" />
                        플랫폼별 맞춤 서비스
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                        당신의 플랫폼,{' '}
                        <span className="text-gradient bg-gradient-to-r from-accent to-accent-400">
                            우리가 압니다
                        </span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        각 이커머스 플랫폼의 수수료 구조, 정산 방식, 세무 이슈를<br className="hidden sm:block" />
                        깊이 이해하는 전문가가 맞춤 솔루션을 제공합니다.
                    </p>
                </motion.div>

                {/* Platform selector - pill buttons with icons and gradient active state */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {platforms.map((platform) => {
                        const Icon = platform.icon;
                        const isActive = activeTab === platform.id;
                        return (
                            <motion.button
                                key={platform.id}
                                onClick={() => setActiveTab(platform.id)}
                                variants={itemVariants}
                                className={cn(
                                    'group relative flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300',
                                    isActive
                                        ? 'text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5'
                                )}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Active gradient background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className={cn('absolute inset-0 rounded-2xl bg-gradient-to-r', platform.gradient)}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <Icon className={cn('h-5 w-5 relative z-10', !isActive && platform.iconColor)} />
                                <span className="relative z-10">{platform.name}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Tab content with animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <div className="grid lg:grid-cols-5 gap-6 items-start">
                            {/* Left: Platform hero card */}
                            <div className={cn(
                                'lg:col-span-2 rounded-3xl p-8 relative overflow-hidden',
                                activePlatform.lightBg,
                                'border',
                                activePlatform.borderColor
                            )}>
                                {/* Decorative large icon */}
                                <div className="absolute -top-6 -right-6 opacity-[0.07]">
                                    <ActiveIcon className="h-40 w-40" />
                                </div>

                                <div className="relative z-10">
                                    <div className={cn(
                                        'inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br shadow-lg mb-6',
                                        activePlatform.gradient
                                    )}>
                                        <ActiveIcon className="h-8 w-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {activePlatform.name} 셀러<br />세무 이슈
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        {activePlatform.name} 플랫폼 특화 세무 문제를 정확히 진단하고 해결합니다.
                                    </p>

                                    {/* Process steps - vertical timeline */}
                                    <div className="space-y-3">
                                        {activePlatform.process.map((step, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className={cn(
                                                    'flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold shrink-0',
                                                    activePlatform.accentDot
                                                )}>
                                                    {idx + 1}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{step}</span>
                                                {idx < activePlatform.process.length - 1 && (
                                                    <ArrowRight className="h-3.5 w-3.5 text-gray-300 ml-auto" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Issue cards */}
                            <div className="lg:col-span-3 space-y-4">
                                {activePlatform.issues.map((issue, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={cn(
                                            'group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm',
                                            'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
                                            'flex items-start gap-5'
                                        )}
                                    >
                                        {/* Number badge */}
                                        <div className={cn(
                                            'flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 bg-gradient-to-br text-white font-bold text-lg shadow-md',
                                            activePlatform.gradient
                                        )}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors">
                                                {issue.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {issue.description}
                                            </p>
                                        </div>

                                        {/* Hover arrow */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center">
                                            <CheckCircle2 className={cn('h-6 w-6', activePlatform.iconColor)} />
                                        </div>
                                    </motion.div>
                                ))}

                                {/* CTA banner */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={cn(
                                        'rounded-2xl p-6 bg-gradient-to-r text-white flex items-center justify-between',
                                        activePlatform.gradient
                                    )}
                                >
                                    <div>
                                        <p className="font-bold text-lg mb-1">
                                            {activePlatform.name} 셀러 세무, 전문가에게 맡기세요
                                        </p>
                                        <p className="text-white/80 text-sm">무료 상담으로 절세 포인트를 확인하세요</p>
                                    </div>
                                    <a
                                        href="/consultation/"
                                        className="shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-5 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
                                    >
                                        상담 신청
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
