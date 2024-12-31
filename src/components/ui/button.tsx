import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md',
    asChild,
    className, 
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    
    return (
      <Comp
        className={cn(
          'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Size styles
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          size === 'icon' && 'p-2',
          // Variant styles
          variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
          variant === 'secondary' && 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
          variant === 'outline' && 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
          variant === 'ghost' && 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          className
        )}
        ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";