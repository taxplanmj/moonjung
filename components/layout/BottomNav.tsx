'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Play, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
    { label: '홈', href: '/', icon: Home },
    { label: '서비스', href: '/#services', icon: Briefcase },
    { label: '영상', href: '/#shorts', icon: Play },
    { label: '상담', href: '/consultation/', icon: MessageCircle },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 safe-area-bottom">
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href.replace('/#', '')));
                    const isConsultation = tab.href === '/consultation/';

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={cn(
                                'flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] py-1 px-2 rounded-xl transition-colors',
                                isActive
                                    ? 'text-accent'
                                    : 'text-gray-400 hover:text-gray-600',
                                isConsultation && !isActive && 'text-accent/70'
                            )}
                        >
                            <Icon className={cn('h-5 w-5', isConsultation && 'h-[22px] w-[22px]')} />
                            <span className={cn(
                                'text-[10px] font-medium leading-none',
                                isActive && 'font-semibold'
                            )}>
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
