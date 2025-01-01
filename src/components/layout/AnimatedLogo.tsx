import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function AnimatedLogo({ className, ...props }: AnimatedLogoProps) {
  return (
    <motion.div
      className={cn('relative', className)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      {...props}
    >
      {/* Logo background with gradient and glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 rounded-full blur-xl" />
      
      {/* Logo container */}
      <motion.div
        className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-full p-4"
        animate={{
          boxShadow: [
            "0 0 20px rgba(124,58,237,0.5)",
            "0 0 30px rgba(59,130,246,0.5)",
            "0 0 20px rgba(236,72,153,0.5)",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Logo icon */}
        <motion.div
          className="relative z-10 w-full h-full bg-gradient-to-br from-white to-white/80 rounded-full p-3"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
        </motion.div>

        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3
            }}
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: `${(i + 1) * 10}px ${(i + 1) * 10}px`
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}