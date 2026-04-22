import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';

const quickLinks = [
    { label: '서비스 소개', href: '/#services' },
    { label: '성장 로드맵', href: '/#roadmap' },
    { label: '세무 꿀팁 영상', href: '/#shorts' },
    { label: '전문가 소개', href: '/#team' },
    { label: '무료 상담신청', href: '/consultation/' },
];

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Company info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-bold text-lg">
                                문
                            </div>
                            <div>
                                <div className="font-bold text-lg">문정세무회계컨설팅</div>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
                            이커머스 셀러의 성장을 함께하는 세무·회계·컨설팅 전문 파트너.
                            세무신고부터 정책자금, 법인전환까지 원스톱으로 지원합니다.
                        </p>

                        {/* Address */}
                        <div className="flex items-start gap-3 text-sm text-white/60 mb-3">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent/70" />
                            <span>
                                서울 송파구 법원로11길 11<br />
                                문정현대지식산업센터 1차 A동 609~611호
                            </span>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-2">
                            <a href="tel:02-402-2353" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors min-h-[44px]">
                                <Phone className="h-4 w-4 text-accent/70" />
                                02-402-2353
                            </a>
                            <a href="mailto:taxplanmj@gmail.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors min-h-[44px]">
                                <Mail className="h-4 w-4 text-accent/70" />
                                taxplanmj@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white/90">바로가기</h4>
                        <nav className="space-y-1">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2 text-sm text-white/50 hover:text-accent transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* CTA & Social */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white/90">빠른 연결</h4>
                        <div className="space-y-3">
                            <a
                                href="https://pf.kakao.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FEE500]/10 border border-[#FEE500]/20 text-sm font-medium text-[#FEE500] hover:bg-[#FEE500]/20 transition-colors"
                            >
                                <MessageCircle className="h-5 w-5" />
                                카카오톡 상담
                                <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-50" />
                            </a>
                            <a
                                href="https://blog.naver.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#03C75A]/10 border border-[#03C75A]/20 text-sm font-medium text-[#03C75A] hover:bg-[#03C75A]/20 transition-colors"
                            >
                                <span className="font-bold text-xs">N</span>
                                네이버 블로그
                                <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-50" />
                            </a>
                            <a
                                href="tel:02-402-2353"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
                            >
                                <Phone className="h-5 w-5" />
                                전화 상담
                                <span className="ml-auto text-xs text-white/40">09:00~18:00</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                        © {new Date().getFullYear()} 문정세무회계컨설팅. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors min-h-0">
                            개인정보처리방침
                        </Link>
                        <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors min-h-0">
                            이용약관
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
