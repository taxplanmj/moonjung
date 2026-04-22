import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'accent' | 'outline' | 'success';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    const variants = {
        default: 'bg-primary/10 text-primary border-primary/20',
        accent: 'bg-accent/10 text-accent-700 border-accent/20',
        outline: 'bg-transparent text-gray-700 border-gray-300',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
