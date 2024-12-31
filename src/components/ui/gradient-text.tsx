import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string;
  to?: string;
}

export function GradientText({ 
  from = "from-blue-500", 
  to = "to-purple-500", 
  className,
  ...props 
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        to,
        className
      )}
      {...props}
    />
  );
}