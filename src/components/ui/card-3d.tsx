import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export function Card3D({ children, glowColor = '#7c3aed', className, ...props }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dampenedX = useSpring(mouseX, {
    stiffness: 150,
    damping: 20
  });

  const dampenedY = useSpring(mouseY, {
    stiffness: 150,
    damping: 20
  });

  const rotateXSpring = useTransform(dampenedY, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateYSpring = useTransform(dampenedX, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXRelative = (e.clientX - centerX) / (rect.width / 2);
    const mouseYRelative = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative rounded-xl perspective-1000',
        'transition-[filter] duration-300',
        'hover:filter hover:drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]',
        className
      )}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className={cn(
          'glass-effect rounded-xl p-6',
          'transform-gpu transition-transform duration-300',
          'hover:translate-z-8'
        )}
      >
        {children}
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}