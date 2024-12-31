import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AnimatedBackground } from './animated-background';
import { PageTransition } from './page-transition';

export function Layout() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <AnimatedBackground />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6 relative">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
        </div>
      </div>
    </motion.div>
  );
}