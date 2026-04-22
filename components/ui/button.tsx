import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm',
                accent: 'bg-accent text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm shadow-accent/25',
                outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
                'outline-accent': 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
                ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                link: 'text-accent underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-6 py-2.5',
                sm: 'h-9 px-4 text-xs',
                lg: 'h-13 px-8 py-3 text-base',
                xl: 'h-14 px-10 py-4 text-lg',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
