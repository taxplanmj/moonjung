import type { Metadata } from 'next';
import ConsultationForm from '@/components/forms/ConsultationForm';
import Footer from '@/components/sections/Footer';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: '무료 상담신청',
    description: '이커머스 셀러 맞춤 세무 상담을 무료로 받아보세요. 3분이면 충분합니다.',
};

export default function ConsultationPage() {
    return (
        <>
            <section className="relative section-padding overflow-hidden">
                {/* Background — same pattern as PlatformTabs section */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />

                <div className="section-container relative z-10 pt-12 lg:pt-16">
                    <div className="max-w-2xl mx-auto">
                        {/* Section header — matching landing page pattern */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
                                <Sparkles className="h-3.5 w-3.5" />
                                무료 상담 · 3분 완성
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
                                맞춤 세무 전략,{' '}
                                <span className="text-gradient bg-gradient-to-r from-accent to-accent-400">
                                    무료로 시작하세요
                                </span>
                            </h1>
                            <p className="text-gray-500 max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
                                이커머스 전문가가 사장님의 플랫폼과 매출 규모에 딱 맞는
                                <br className="hidden sm:block" />
                                절세 전략을 직접 제안해 드립니다.
                            </p>
                        </div>

                        {/* Form card — matching PlatformTabs card style */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10">
                            <ConsultationForm />
                        </div>

                        <p className="text-center text-xs text-gray-400 mt-6">
                            🔒 입력하신 정보는 상담 목적으로만 사용되며, 안전하게 보호됩니다.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
