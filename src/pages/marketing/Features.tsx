import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Calculator,
  DollarSign,
  Users,
  Shield,
  BarChart2,
} from 'lucide-react';

const features = [
  {
    title: 'GST Filing',
    description: 'Automated GST return filing with real-time tracking and compliance checks.',
    icon: FileText,
  },
  {
    title: 'TDS Management',
    description: 'Comprehensive TDS calculation, deduction, and return filing system.',
    icon: Calculator,
  },
  {
    title: 'Payroll Processing',
    description: 'End-to-end payroll management including PF, ESIC, and PT compliance.',
    icon: DollarSign,
  },
  {
    title: 'Employee Management',
    description: 'Complete employee lifecycle management and compliance.',
    icon: Users,
  },
  {
    title: 'Data Security',
    description: 'Bank-grade security with encryption and regular security audits.',
    icon: Shield,
  },
  {
    title: 'Analytics',
    description: 'Advanced analytics and reporting for business insights.',
    icon: BarChart2,
  },
];

export function Features() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover how Finmate can streamline your financial compliance and
          business operations with our comprehensive feature set.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-6 w-6" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}