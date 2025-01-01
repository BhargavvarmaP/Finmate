import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { Card3D } from '@/components/ui/card-3d';
import { cn } from '@/lib/utils';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  Briefcase,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const businessTypes = [
  {
    id: 'private',
    title: 'Private Limited',
    description: 'Best for established businesses with multiple shareholders',
    icon: Building2,
    color: '#3b82f6'
  },
  {
    id: 'llp',
    title: 'LLP',
    description: 'Ideal for professional services and partnerships',
    icon: Users,
    color: '#22c55e'
  },
  {
    id: 'proprietorship',
    title: 'Proprietorship',
    description: 'Perfect for small businesses and individual entrepreneurs',
    icon: Briefcase,
    color: '#f59e0b'
  }
];

const steps = [
  {
    title: 'Business Details',
    description: 'Basic information about your business',
    isComplete: true
  },
  {
    title: 'Address & Contact',
    description: 'Contact and location information',
    isComplete: false,
    isCurrent: true
  },
  {
    title: 'Documents',
    description: 'Upload required business documents',
    isComplete: false
  }
];

export function BusinessSetup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(businessSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // API call to save business details
      navigate('/auth/payment-setup');
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <GradientText className="text-4xl font-bold mb-2">
            Set Up Your Business
          </GradientText>
          <p className="text-gray-400">
            Tell us about your business to get started with Finmate
          </p>
        </div>

        {/* Progress Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative",
                index < steps.length - 1 && "after:content-[''] after:absolute after:top-1/2 after:left-full after:w-full after:h-0.5",
                index < steps.length - 1 && (step.isComplete ? "after:bg-purple-500" : "after:bg-gray-700")
              )}
            >
              <div className={cn(
                "flex items-start gap-4 p-4 rounded-lg",
                step.isCurrent ? "bg-white/10" : "bg-white/5"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  step.isComplete ? "bg-purple-500" : "bg-gray-700"
                )}>
                  {step.isComplete ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white">{index + 1}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Business Type Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Select Business Type
            </h3>
            <div className="space-y-4">
              {businessTypes.map((type) => (
                <Card3D
                  key={type.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-300",
                    "hover:scale-105"
                  )}
                  glowColor={type.color}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${type.color}20` }}
                    >
                      <type.icon
                        className="w-6 h-6"
                        style={{ color: type.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{type.title}</h4>
                      <p className="text-sm text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>

          {/* Business Details Form */}
          <div className="lg:col-span-2">
            <GlassPanel className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Business Information
              </h3>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Business Name
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register('businessName')}
                        type="text"
                        placeholder="Your Company Ltd."
                        className={cn(
                          "pl-10 bg-white/5 border-white/10",
                          "focus:border-purple-500 focus:ring-purple-500",
                          "placeholder:text-gray-500"
                        )}
                      />
                      <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      GST Number
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register('gstin')}
                        type="text"
                        placeholder="22AAAAA0000A1Z5"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10",
                          "focus:border-purple-500 focus:ring-purple-500",
                          "placeholder:text-gray-500"
                        )}
                      />
                      <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Business Email
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register('email')}
                        type="email"
                        placeholder="contact@company.com"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10",
                          "focus:border-purple-500 focus:ring-purple-500",
                          "placeholder:text-gray-500"
                        )}
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Business Phone
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register('phone')}
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10",
                          "focus:border-purple-500 focus:ring-purple-500",
                          "placeholder:text-gray-500"
                        )}
                      />
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Business Address
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register('address')}
                        type="text"
                        placeholder="123 Business Street"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10",
                          "focus:border-purple-500 focus:ring-purple-500",
                          "placeholder:text-gray-500"
                        )}
                      />
                      <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Website (Optional)
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register('website')}
                        type="url"
                        placeholder="https://company.com"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10",
                          "focus:border-purple-500 focus:ring-purple-500",
                          "placeholder:text-gray-500"
                        )}
                      />
                      <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      "bg-gradient-to-r from-purple-600 to-blue-600",
                      "hover:from-purple-700 hover:to-blue-700",
                      "text-white flex items-center gap-2",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isSubmitting}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </GlassPanel>
          </div>
        </div>
      </motion.div>
    </div>
  );
}