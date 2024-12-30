import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="text-primary">Finmate</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one financial compliance platform for small and medium-sized businesses
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">GST Filing</h3>
              <p className="text-muted-foreground">
                Automated GST return filing with real-time tracking and compliance checks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">Income Tax</h3>
              <p className="text-muted-foreground">
                Simplified income tax filing with AI-powered optimization suggestions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">Financial Reports</h3>
              <p className="text-muted-foreground">
                Generate comprehensive financial reports with just a few clicks
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}