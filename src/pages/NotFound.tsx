import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import { GlassPanel } from '@/components/ui/glass-panel';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassPanel className="p-8 text-center">
          <GradientText className="text-6xl font-bold mb-4">404</GradientText>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
