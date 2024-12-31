import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export function GlassCard({ children, hover = true, className, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-white/10 to-white/5",
        "backdrop-blur-lg shadow-xl",
        "border border-white/10",
        "p-6",
        className
      )}
      {...props}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent to-white/5" />
    </motion.div>
  );
}