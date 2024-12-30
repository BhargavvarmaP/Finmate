import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedLogo } from '@/components/layout/AnimatedLogo';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center space-y-8"
        >
          <motion.div variants={item}>
            <AnimatedLogo />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Your All-in-One Financial Compliance Platform
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Simplify GST filing, TDS management, and financial compliance for your business
          </motion.p>

          <motion.div variants={item} className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}