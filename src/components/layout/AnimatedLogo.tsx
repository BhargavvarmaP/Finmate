import { motion } from 'framer-motion';

export function AnimatedLogo() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      />
      <span className="text-xl font-bold">Finmate</span>
    </motion.div>
  );
}