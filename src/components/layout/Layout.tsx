import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AnimatedBackground } from './AnimatedBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AnimatedBackground />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 relative">
          {children}
        </main>
      </div>
    </div>
  );
}