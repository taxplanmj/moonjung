'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCountUp } from '@/lib/useCountUp';

const priceCardContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const priceCardItem: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
};

function PriceBox({
    label,
    amount,
    from,
    boxClass,
    labelClass,
    subClass,
}: {
    label: string;
    amount: number;
    from: number;
    boxClass: string;
    labelClass: string;
    subClass: string;
}) {
    const { count, ref } = useCountUp(amount, 2000, from);
    return (
        <motion.div
            ref={ref}
            variants={priceCardItem}
            whileHover={{ y: -4 }}
            className={cn('text-center rounded-2xl border py-8 px-4 transition-shadow duration-300 hover:shadow-xl', boxClass)}
        >
            <p className={cn('text-sm font-semibold mb-3', labelClass)}>{label}</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-white mb-1 tabular-nums">
                {count}만원<span className={cn('text-base font-semibold', subClass)}>부터</span>
            </p>
            <p className={cn('text-xs', subClass)}>(VAT 별도)</p>
        </motion.div>
    );
}

export default function PricingSection() {
    return (
        <section className="relative pt-6 pb-16 sm:pb-20 lg:pt-8 lg:pb-24 overflow-hidden">
            {/* Dark navy background — matches the site's "featured" section rhythm, with real contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1526] via-[#1e3a5f] to-[#0a1526]" />

            {/* Ledger-line texture — faint ruled lines, nods to 기장(bookkeeping ledger) */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(255,255,255,0.9) 31px, rgba(255,255,255,0.9) 32px)',
                }}
            />

            {/* Orange glow */}
            <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-accent/15 rounded-full blur-[130px]" />
            <div className="absolute bottom-0 right-0 w-[550px] h-[400px] bg-accent/15 rounded-full blur-[140px]" />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 rounded-full px-5 py-2 text-xs font-semibold mb-6">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        투명한 기장료
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
                        저렴한 기장료엔,{' '}
                        <span className="text-gradient bg-gradient-to-r from-accent to-accent-300">
                            이유가 있습니다
                        </span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        낮은 기장료로 시작해서 나중에 다른 비용으로 회수하는 구조, 문정은 다릅니다.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {/* Warning callout */}
                    <motion.div
                        className="rounded-2xl border border-amber-400/30 bg-amber-500/10 backdrop-blur-sm p-6 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-white mb-1">기장료만 보고 선택하게 되면 놓치는 것</p>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    <strong className="text-red-400 font-bold">
                                        개인 3만원, 법인 5만원처럼 지나치게 낮은 기장료
                                    </strong>
                                    는{' '}
                                    <strong className="text-amber-300 font-bold">
                                        사실상 제대로 관리되기 어려운 금액
                                    </strong>
                                    입니다.
                                    <br />
                                    이런 경우 종합소득세 신고나 법인결산 시점의{' '}
                                    <strong className="text-amber-300 font-bold">
                                        &lsquo;조정료&rsquo;에서 그 차액을 보전
                                    </strong>
                                    하는 경우가 많습니다.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing card — same glass-on-dark treatment as CFORoadmap/StatsSection cards */}
                    <motion.div
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl p-8 lg:p-10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="text-sm sm:text-base text-white/50 mb-8 text-center leading-relaxed">
                            이커머스 특화 관리 노하우로 효율적으로 운영하기 때문에,
                            <br />
                            처음부터 합리적인 기장료를 제시할 수 있습니다.
                        </p>

                        <motion.div
                            className="grid sm:grid-cols-2 gap-5 mb-8"
                            variants={priceCardContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                        >
                            <PriceBox
                                label="개인사업자"
                                amount={6}
                                from={15}
                                boxClass="bg-blue-500/10 border-blue-400/30"
                                labelClass="text-blue-200"
                                subClass="text-blue-200/60"
                            />
                            <PriceBox
                                label="법인사업자"
                                amount={12}
                                from={30}
                                boxClass="bg-accent/10 border-accent/30"
                                labelClass="text-accent-200"
                                subClass="text-accent-200/60"
                            />
                        </motion.div>

                        <div className="flex items-center justify-center gap-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-accent-300" />
                            <span className="text-sm font-semibold text-accent-300">
                                조정료도 업계 최저 수준으로 제공합니다
                            </span>
                        </div>
                        <p className="text-xs text-white/30 text-center mb-8">
                            이커머스 셀러 우대 요금이며, 다른 업종은 별도 상담 후 안내드립니다
                        </p>

                        <div className="text-center">
                            <Link href="/consultation/">
                                <Button variant="accent" size="xl" className="shadow-glow">
                                    기장료 확인하러 가기
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
