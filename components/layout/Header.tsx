'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
    { label: '서비스', href: '/#services' },
    { label: '성장 로드맵', href: '/#roadmap' },
    { label: '세무 꿀팁', href: '/#shorts' },
    { label: '전문가 소개', href: '/#team' },
];

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHomePage = pathname === '/';
    const showWhiteBg = !isHomePage || isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                showWhiteBg
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                    : 'bg-transparent'
            )}
        >
            <div className="section-container">
                <div className="flex h-16 items-center justify-between lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 min-h-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
                            문
                        </div>
                        <span className={cn(
                            'text-sm font-bold leading-tight transition-colors',
                            showWhiteBg ? 'text-primary' : 'text-white'
                        )}>
                            문정세무회계컨설팅
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors min-h-0',
                                    showWhiteBg
                                        ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="tel:02-402-2353"
                            className={cn(
                                'flex items-center gap-1.5 text-sm font-medium transition-colors min-h-0',
                                showWhiteBg ? 'text-gray-600' : 'text-white/80'
                            )}
                        >
                            <Phone className="h-4 w-4" />
                            02-402-2353
                        </a>
                        <Link href="/consultation/">
                            <Button variant="accent" size="default">
                                무료 상담신청
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={cn(
                            'lg:hidden p-2 rounded-lg transition-colors',
                            showWhiteBg ? 'text-gray-700' : 'text-white'
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="메뉴 열기"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100',
                    isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <nav className="section-container py-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-2 px-4">
                        <Link href="/consultation/" onClick={() => setIsOpen(false)}>
                            <Button variant="accent" className="w-full">
                                무료 상담신청
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
