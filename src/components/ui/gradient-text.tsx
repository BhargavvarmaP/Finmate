import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
  className?: string;
}

export function GradientText({
  children,
  from = 'from-purple-600',
  via = 'via-blue-600',
  to = 'to-pink-600',
  animate = false,
  className,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r',
        from,
        via,
        to,
        animate && 'animate-gradient bg-[length:200%_auto]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}