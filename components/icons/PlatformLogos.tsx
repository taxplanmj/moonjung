import React from 'react';

/* ── Coupang-style Logo ── */
export function CoupangLogo({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 4C11.16 4 4 11.16 4 20C4 28.84 11.16 36 20 36C24.08 36 27.78 34.44 30.56 31.88L25.6 27.2C23.96 28.68 21.88 29.6 19.6 29.6C14.52 29.6 10.4 25.48 10.4 20.4C10.4 15.32 14.52 11.2 19.6 11.2C21.88 11.2 23.96 12.12 25.6 13.6L30.56 8.92C27.78 6.36 24.08 4 20 4Z"
                fill="currentColor"
            />
        </svg>
    );
}

/* ── TikTok-style Logo ── */
export function TiktokLogo({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M29.5 8.5C28.12 6.94 27.33 4.94 27.25 3H22.08V26.17C22.04 27.09 21.65 27.96 20.99 28.6C20.33 29.24 19.46 29.6 18.54 29.6C16.62 29.6 15.04 28.04 15.04 26.08C15.04 23.72 17.28 21.96 19.6 22.68V17.38C14.36 16.78 9.88 20.92 9.88 26.08C9.88 31.08 14.04 34.8 18.5 34.8C23.28 34.8 27.25 30.84 27.25 26.08V14.3C29.09 15.62 31.29 16.33 33.55 16.32V11.16C33.55 11.16 31.21 11.28 29.5 8.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

/* ── Naver-style "N" Logo ── */
export function NaverLogo({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.16 21.56L15.36 6H6V34H15.84V18.44L24.64 34H34V6H24.16V21.56Z"
                fill="currentColor"
            />
        </svg>
    );
}

/* ── Overseas/Cross-border Trade Icon ── */
export function OverseasIcon({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M38 18.5H30.5L20 6H16L21 18.5H8L5 14H2L4 21L2 28H5L8 23.5H21L16 36H20L30.5 23.5H38C39.1 23.5 40 22.38 40 21C40 19.62 39.1 18.5 38 18.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

/* ── Own Mall / D2C Store Icon ── */
export function OwnMallIcon({ className = 'h-6 w-6' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Store front */}
            <path
                d="M5 16L8 6H32L35 16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            {/* Awning scallops */}
            <path
                d="M5 16C5 18.2 6.8 20 9 20C11.2 20 13 18.2 13 16C13 18.2 14.8 20 17 20C19.2 20 21 18.2 21 16C21 18.2 22.8 20 25 20C27.2 20 29 18.2 29 16C29 18.2 30.8 20 33 20C35.2 20 37 18.2 37 16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            {/* Building */}
            <rect x="7" y="20" width="26" height="16" stroke="currentColor" strokeWidth="2" fill="none" rx="1" />
            {/* Door */}
            <rect x="16" y="26" width="8" height="10" stroke="currentColor" strokeWidth="1.8" fill="none" rx="1" />
            {/* Star badge */}
            <path
                d="M33 6L34.2 8.5L37 8.9L35 10.8L35.4 13.6L33 12.3L30.6 13.6L31 10.8L29 8.9L31.8 8.5L33 6Z"
                fill="currentColor"
            />
        </svg>
    );
}
