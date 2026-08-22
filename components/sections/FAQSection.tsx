'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { faqs } from '@/lib/faq-data';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL || 'https://pf.kakao.com';

    return (
        <section className="section-container pt-6 pb-16 sm:pb-20 lg:pt-8 lg:pb-24">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
                    <HelpCircle className="h-3.5 w-3.5" />
                    자주 묻는 질문
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                    상담 전에{' '}
                    <span className="text-gradient bg-gradient-to-r from-accent to-accent-400">궁금하셨던 것들</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    사장님들이 상담 전에 가장 많이 물어보시는 질문을 모았습니다.
                </p>
            </motion.div>

            <motion.div
                className="max-w-3xl mx-auto space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <motion.div
                            key={faq.question}
                            variants={itemVariants}
                            className={cn(
                                'rounded-2xl border-2 bg-white transition-colors overflow-hidden',
                                isOpen ? 'border-accent/30' : 'border-gray-100'
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                            >
                                <span className="font-bold text-base sm:text-lg text-gray-900">{faq.question}</span>
                                <ChevronDown
                                    className={cn(
                                        'h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300',
                                        isOpen && 'rotate-180 text-accent'
                                    )}
                                />
                            </button>
                            <div
                                className={cn(
                                    'grid transition-all duration-300 ease-out',
                                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-500 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Kakao CTA */}
            <motion.div
                className="max-w-3xl mx-auto mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#FEE500]/15 border border-[#FEE500]/40 p-6 sm:p-7">
                    <p className="text-sm sm:text-base font-semibold text-gray-800 text-center sm:text-left">
                        더 궁금한 점이 있으신가요?<br className="sm:hidden" /> 카카오톡으로 편하게 물어보세요.
                    </p>
                    <a
                        href={kakaoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#FEE500] px-6 py-3 text-sm font-bold text-[#3C1E1E] shadow-sm hover:brightness-95 transition-all"
                    >
                        <MessageCircle className="h-4 w-4 fill-[#3C1E1E]" />
                        카카오톡 문의하기
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
