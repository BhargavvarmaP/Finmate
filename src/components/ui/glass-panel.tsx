import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl",
        "bg-gradient-to-br from-white/10 to-white/5",
        "backdrop-blur-lg shadow-lg",
        "border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}