'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

/* ── Team members ── */
const team = [
    { name: '권민수', role: '대표 세무사', credential: '세무사 · 경영지도사', platform: '전체 총괄', photo: '/images/team-kwon.png', badgeBg: 'bg-blue-50', badgeText: 'text-blue-600', platformColor: 'text-blue-400' },
    { name: '이정훈', role: '세무사', credential: 'CTA', platform: '쿠팡·네이버', photo: '/images/team-lee.png', badgeBg: 'bg-red-50', badgeText: 'text-red-600', platformColor: 'text-red-400' },
    { name: '박서연', role: '팀장', credential: '세무기장 전문', platform: '해외직구·틱톡샵', photo: '/images/team-park.png', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-600', platformColor: 'text-emerald-400' },
    { name: '최도윤', role: '과장', credential: '정책자금 전문', platform: '자사몰·정책자금', photo: '/images/team-choi.png', badgeBg: 'bg-amber-50', badgeText: 'text-amber-600', platformColor: 'text-amber-500' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 90,
            damping: 20,
        },
    },
};

export default function TeamSection() {
    return (
        <section id="team" className="relative py-20 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px]" />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
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
                        플랫폼별 전담 전문가가 직접 맡아 드립니다.
                    </p>
                </motion.div>

                {/* Team cards */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {team.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={itemVariants}
                            className={cn(
                                'group relative bg-white rounded-3xl overflow-hidden text-center',
                                'border border-gray-100 shadow-sm',
                                'hover:shadow-2xl hover:-translate-y-2 transition-all duration-500'
                            )}
                        >
                            {/* Photo */}
                            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={member.photo}
                                    alt={`${member.name} ${member.role}`}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Gradient overlay at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Name on photo */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                                    <h4 className="font-bold text-white text-xl mb-0.5">{member.name}</h4>
                                    <p className="text-sm text-white/70">{member.role}</p>
                                </div>
                            </div>

                            {/* Info below photo */}
                            <div className="px-5 py-4">
                                {/* Credential badge */}
                                <div className={cn(
                                    'inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-2.5',
                                    member.badgeBg, member.badgeText
                                )}>
                                    {member.credential}
                                </div>

                                {/* Platform */}
                                <p className={cn('text-sm font-semibold', member.platformColor)}>
                                    담당: {member.platform}
                                </p>
                            </div>

                            {/* Hover border */}
                            <div className={cn(
                                'absolute inset-0 rounded-3xl border-2 border-transparent',
                                'group-hover:border-accent/30 transition-colors duration-500'
                            )} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
