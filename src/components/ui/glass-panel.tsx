import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'light' | 'medium' | 'heavy';
}

const blurValues = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

const intensityValues = {
  light: 'bg-white/5',
  medium: 'bg-white/10',
  heavy: 'bg-white/20',
};

export function GlassPanel({
  children,
  className,
  blur = 'md',
  intensity = 'medium',
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'relative rounded-lg border border-white/20',
        'shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
        blurValues[blur],
        intensityValues[intensity],
        className
      )}
      {...props}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-50"
        style={{
          background: 'linear-gradient(45deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1), rgba(236,72,153,0.1))',
          filter: 'blur(4px)',
          zIndex: -1,
        }}
      />

      {/* Inner shadow effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-30"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255,255,255,0.1)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}