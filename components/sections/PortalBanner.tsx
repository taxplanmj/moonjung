'use client';

import React from 'react';
import { Lock, ArrowRight, Shield, FileText, MessageCircle } from 'lucide-react';

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

export default function PortalBanner() {
    return (
        <section className="section-container py-10 lg:py-16">
            <motion.div
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-[#1e3a5f] to-primary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Background effects */}
                <div className="absolute inset-0 grid-pattern opacity-10" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-[100px] animate-pulse-soft" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/15 rounded-full blur-[100px] animate-pulse-soft" />

                <div className="relative z-10 p-8 sm:p-12">
                    {/* Top badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Coming Soon</span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="flex-1">
                            <h4 className="font-extrabold text-white text-2xl sm:text-3xl mb-3">
                                내 세무 현황,<br className="sm:hidden" /> 한눈에 확인하세요
                            </h4>
                            <p className="text-white/50 text-sm sm:text-base mb-8 max-w-lg leading-relaxed">
                                기장 고객 전용 포털에서 실시간으로 세무 현황을 조회하고,<br className="hidden sm:block" />
                                서류를 업로드하고, 담당 전문가와 1:1 소통하세요.
                            </p>

                            {/* Feature pills */}
                            <motion.div
                                className="flex flex-wrap gap-3"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.div variants={itemVariants} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <Shield className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <span className="text-white/80 text-xs font-semibold">실시간 세무 현황</span>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-emerald-400" />
                                    </div>
                                    <span className="text-white/80 text-xs font-semibold">간편 서류 업로드</span>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                    <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                        <MessageCircle className="h-4 w-4 text-violet-400" />
                                    </div>
                                    <span className="text-white/80 text-xs font-semibold">1:1 전담 메시지</span>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            className="flex flex-col items-center gap-3 shrink-0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <button
                                disabled
                                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-accent to-accent-400 text-white text-sm font-bold cursor-not-allowed flex items-center gap-3 shadow-lg"
                            >
                                <Lock className="h-4 w-4" />
                                고객 포털 입장
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <span className="text-white/30 text-[11px] font-medium">기장 고객 전용 · 2단계 오픈 예정</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
