import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: 50 }).map(() => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full bg-white/5';
      containerRef.current?.appendChild(particle);
      return particle;
    });

    particles.forEach((particle) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });

      gsap.to(particle, {
        duration: 'random(2, 8)',
        x: '+=100',
        y: '+=100',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    />
  );
}