'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Accent colors for card top borders ── */
const accentColors = [
    'border-t-blue-500',
    'border-t-red-500',
    'border-t-emerald-500',
    'border-t-amber-500',
    'border-t-violet-500',
];

const tagColors: Record<string, { bg: string; text: string }> = {
    '쿠팡': { bg: 'bg-red-50', text: 'text-red-600' },
    '네이버': { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    '해외직구': { bg: 'bg-blue-50', text: 'text-blue-600' },
    '자사몰': { bg: 'bg-violet-50', text: 'text-violet-600' },
    '틱톡샵': { bg: 'bg-pink-50', text: 'text-pink-600' },
    '정책자금': { bg: 'bg-amber-50', text: 'text-amber-600' },
    '법인전환': { bg: 'bg-indigo-50', text: 'text-indigo-600' },
};

const testimonials = [
    { quote: '쿠팡 수수료 정리만으로 연 800만원 절세 효과를 봤습니다.', author: '쿠팡 셀러 K사', tag: '쿠팡', rating: 5 },
    { quote: '법인 전환 타이밍을 정확히 잡아줘서 세금 부담이 확 줄었어요.', author: '스마트스토어 L사', tag: '네이버', rating: 5 },
    { quote: '정책자금 3건 연속 승인! 정말 전문적이에요.', author: '자사몰 M사', tag: '정책자금', rating: 5 },
    { quote: '로켓그로스 정산 구조를 한눈에 정리해주셔서 감사합니다.', author: '쿠팡 셀러 A사', tag: '쿠팡', rating: 5 },
    { quote: '해외직구 관세 환급 절차를 깔끔하게 처리해주셨어요.', author: '해외직구 B사', tag: '해외직구', rating: 5 },
    { quote: '네이버 스마트스토어 매출 관리가 체계적으로 변했습니다.', author: '스마트스토어 C사', tag: '네이버', rating: 5 },
    { quote: '틱톡샵 크로스보더 정산, 이제 안심이에요.', author: '틱톡샵 D사', tag: '틱톡샵', rating: 5 },
    { quote: '법인 전환 후 연 1,200만원 절세 효과를 체감하고 있습니다.', author: '종합몰 E사', tag: '법인전환', rating: 5 },
    { quote: '매달 기장 보고서가 너무 꼼꼼해서 만족스럽습니다.', author: '자사몰 F사', tag: '자사몰', rating: 5 },
    { quote: '부가세 신고 시즌마다 스트레스 없이 끝나요.', author: '쿠팡 셀러 G사', tag: '쿠팡', rating: 5 },
    { quote: '정책자금 컨설팅으로 사업 성장 가속화할 수 있었어요.', author: '스마트스토어 H사', tag: '정책자금', rating: 5 },
    { quote: '수입 관세 절감 방법까지 제안해주셔서 놀랐습니다.', author: '해외직구 I사', tag: '해외직구', rating: 5 },
    { quote: '세무사님이 직접 상담해주셔서 신뢰가 갑니다.', author: '자사몰 J사', tag: '자사몰', rating: 5 },
    { quote: '3년째 기장 맡기고 있는데, 한 번도 실망한 적 없어요.', author: '쿠팡 셀러 N사', tag: '쿠팡', rating: 5 },
    { quote: '해외 플랫폼 매출 인식 기준을 명확히 잡아줬습니다.', author: '틱톡샵 O사', tag: '틱톡샵', rating: 5 },
];

const row1 = testimonials.slice(0, 8);
const row2 = testimonials.slice(8);

function ReviewCard({ t, idx, accentIdx }: { t: typeof testimonials[0]; idx: number; accentIdx: number }) {
    const colors = tagColors[t.tag] || { bg: 'bg-gray-50', text: 'text-gray-600' };
    return (
        <div
            className={cn(
                'relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm w-[340px] shrink-0',
                'border-t-[3px]',
                accentColors[accentIdx % accentColors.length],
                'hover:shadow-xl hover:scale-[1.03] transition-all duration-300'
            )}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                </div>
                <span className={cn('text-[10px] font-bold px-2.5 py-0.5 rounded-full', colors.bg, colors.text)}>
                    {t.tag}
                </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3 font-medium">
                &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-xs text-gray-400 font-semibold">&mdash; {t.author}</p>
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section className="relative pt-6 pb-20 lg:pt-8 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white">
            <div className="section-container relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        고객 후기
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                        셀러들의{' '}
                        <span className="text-gradient bg-gradient-to-r from-accent to-accent-400">생생한 후기</span>
                    </h3>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        800개 이상의 고객사가 경험한 차이를 확인하세요.
                    </p>
                </div>

                {/* Marquee Row 1: right to left */}
                <div className="relative overflow-hidden mb-5">
                    <div
                        className="flex w-max gap-5"
                        style={{ animation: 'marquee 120s linear infinite' }}
                        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                    >
                        {[...row1, ...row1].map((t, idx) => (
                            <ReviewCard key={`r1-${idx}`} t={t} idx={idx} accentIdx={idx} />
                        ))}
                    </div>
                </div>

                {/* Marquee Row 2: left to right */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex w-max gap-5"
                        style={{ animation: 'marqueeReverse 100s linear infinite' }}
                        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                    >
                        {[...row2, ...row2].map((t, idx) => (
                            <ReviewCard key={`r2-${idx}`} t={t} idx={idx} accentIdx={idx + 2} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
