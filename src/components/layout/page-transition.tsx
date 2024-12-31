import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}