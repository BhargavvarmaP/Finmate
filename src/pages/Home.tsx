import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatedLogo } from '@/components/layout/AnimatedLogo';
import { Card3D } from '@/components/ui/card-3d';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import {
  ArrowRight,
  BarChart2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Users,
  Brain,
  Globe,
  Lightbulb,
  Wallet
} from 'lucide-react';

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

const features = [
  {
    title: 'Intelligent GST Filing',
    description: 'Automated GST return filing with real-time validation, error checks, and smart reconciliation',
    icon: FileText,
    color: '#7c3aed',
    benefits: [
      'Auto-populated GSTR forms',
      'Real-time validation checks',
      'Smart invoice matching',
      'Error resolution suggestions'
    ]
  },
  {
    title: 'Advanced Analytics',
    description: 'Comprehensive financial insights with predictive analytics and custom reporting',
    icon: BarChart2,
    color: '#3b82f6',
    benefits: [
      'Cash flow forecasting',
      'Expense analytics',
      'Custom report builder',
      'Tax liability predictions'
    ]
  },
  {
    title: 'Compliance Suite',
    description: 'Stay compliant with automated updates, deadline tracking, and compliance monitoring',
    icon: ShieldCheck,
    color: '#ec4899',
    benefits: [
      'Compliance calendar',
      'Document vault',
      'Automated reminders',
      'Audit trail maintenance'
    ]
  }
];

const benefits = [
  {
    title: 'Time Savings',
    description: 'Reduce compliance work by up to 75% with automation',
    icon: Brain,
    metric: '75%'
  },
  {
    title: 'Cost Reduction',
    description: 'Lower operational costs with efficient processes',
    icon: Wallet,
    metric: '60%'
  },
  {
    title: 'Error Prevention',
    description: 'Minimize filing errors with validation checks',
    icon: CheckCircle2,
    metric: '99%'
  },
  {
    title: 'Global Compliance',
    description: 'Support for international tax regulations',
    icon: Globe,
    metric: '50+'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CFO, TechCorp Inc.',
    content: 'Finmate has transformed our financial compliance process. The automation and analytics have saved us countless hours.',
    avatar: '👩‍💼'
  },
  {
    name: 'Raj Patel',
    role: 'Director, Global Solutions',
    content: 'The intelligent GST filing system is a game-changer. We\'ve reduced our filing time by 80%.',
    avatar: '👨‍💼'
  },
  {
    name: 'Emma Wilson',
    role: 'Finance Manager, StartUp Co',
    content: 'Outstanding compliance management system. The automated reminders and document vault are invaluable.',
    avatar: '👩‍💼'
  }
];

export function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1) 0%, rgba(59,130,246,0.1) 25%, rgba(236,72,153,0.1) 50%, transparent 100%)',
            y,
            opacity
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10"
      >
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div variants={item} className="mb-8">
              <AnimatedLogo className="w-24 h-24 mx-auto" />
            </motion.div>

            <motion.div variants={item}>
              <GradientText
                from="from-purple-400"
                via="via-blue-400"
                to="to-pink-400"
                animate
                className="text-6xl font-bold leading-tight"
              >
                Transform Your Financial Compliance
              </GradientText>
            </motion.div>

            <motion.p
              variants={item}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Experience the future of financial compliance with AI-powered GST filing,
              intelligent analytics, and automated compliance management.
            </motion.p>

            <motion.div variants={item} className="flex justify-center gap-4 pt-8">
              <Button
                asChild
                size="lg"
                className={cn(
                  "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                  "text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                )}
              >
                <Link to="/register" className="flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={cn(
                  "glass-effect hover:bg-white/20 text-white",
                  "px-8 py-6 text-lg rounded-xl border-white/20"
                )}
              >
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <div className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText className="text-3xl font-bold mb-4">
              Why Choose Finmate?
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of businesses that trust Finmate for their financial compliance needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card3D
                key={index}
                className="p-6 text-center"
              >
                <div className="space-y-4">
                  <div className={cn(
                    "w-16 h-16 mx-auto rounded-2xl",
                    "bg-gradient-to-br from-white/10 to-white/5",
                    "flex items-center justify-center"
                  )}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {benefit.metric}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-black/20 backdrop-blur-lg py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText className="text-3xl font-bold mb-4">
              Powerful Features for Modern Businesses
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Streamline your financial compliance with our comprehensive suite of features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card3D
                key={index}
                className="p-6"
                glowColor={feature.color}
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <GlassPanel className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <GradientText className="text-3xl font-bold mb-4">
              Trusted by Industry Leaders
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what our customers say about their experience with Finmate
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={cn(
                  "glass-effect rounded-xl p-6",
                  "transition-all duration-300 hover:scale-105"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="space-y-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassPanel>

      {/* CTA Section */}
      <div className="relative z-10 py-24 text-center">
        <div className="container mx-auto px-4">
          <Card3D className="p-12 max-w-4xl mx-auto">
            <div className="space-y-8">
              <GradientText
                from="from-purple-400"
                via="via-blue-400"
                to="to-pink-400"
                animate
                className="text-4xl font-bold"
              >
                Ready to Transform Your Financial Compliance?
              </GradientText>
              <p className="text-gray-300 text-xl">
                Join thousands of businesses that trust Finmate for their financial compliance needs.
                Start your free trial today!
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl"
                >
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="glass-effect hover:bg-white/20 text-white px-8 py-6 text-lg rounded-xl border-white/20"
                >
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
}