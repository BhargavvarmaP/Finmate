import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  hoverScale?: number;
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradientFrom = "from-purple-600", gradientTo = "to-blue-600", hoverScale = 1.02, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: hoverScale }}
        className="relative group"
      >
        <div className={cn(
          "absolute -inset-0.5 rounded-lg bg-gradient-to-r",
          gradientFrom,
          gradientTo,
          "opacity-75 group-hover:opacity-100 transition duration-300",
          "blur-sm group-hover:blur"
        )} />
        <Button
          ref={ref}
          className={cn(
            "relative rounded-lg bg-black",
            "text-white font-semibold",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

GradientButton.displayName = 'GradientButton';