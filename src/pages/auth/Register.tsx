import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  User,
  Mail,
  Lock,
  Building2,
  Phone,
  ArrowRight,
  Github,
  Chrome
} from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterForm) => {
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // API call would go here
      console.log('Form data:', data);
      navigate('/auth/kyc');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <GradientText className="text-4xl font-bold mb-2">
            Create Your Account
          </GradientText>
          <p className="text-gray-400">
            Join thousands of businesses managing their finances with Finmate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassPanel className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      {...register('fullName')}
                      type="text"
                      placeholder="John Doe"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500",
                        errors.fullName && "border-red-500"
                      )}
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Business Name
                  </label>
                  <div className="relative">
                    <Input
                      {...register('businessName')}
                      type="text"
                      placeholder="Your Company Ltd."
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500",
                        errors.businessName && "border-red-500"
                      )}
                    />
                    <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    {errors.businessName && (
                      <p className="mt-1 text-sm text-red-500">{errors.businessName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="john@company.com"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500",
                        errors.email && "border-red-500"
                      )}
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Input
                      {...register('phone')}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500",
                        errors.phone && "border-red-500"
                      )}
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      {...register('password')}
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500",
                        errors.password && "border-red-500"
                      )}
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      {...register('confirmPassword')}
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500",
                        errors.confirmPassword && "border-red-500"
                      )}
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="rounded border-gray-500 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-gradient-to-r from-purple-600 to-blue-600",
                  "hover:from-purple-700 hover:to-blue-700",
                  "text-white py-2 rounded-lg flex items-center justify-center gap-2",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full border-white/10 hover:bg-white/5",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Chrome className="w-4 h-4" />
                  Sign up with Google
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full border-white/10 hover:bg-white/5",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-6 text-gray-400"
        >
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Sign in
          </Link>
        </motion.p>
      </div>
    </div>
  );
}