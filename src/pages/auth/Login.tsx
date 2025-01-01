import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { cn } from '@/lib/utils';
import { login } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { useToast } from '@/components/ui/use-toast';
import {
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await dispatch(login(data) as any);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to log in'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <GradientText className="text-4xl font-bold mb-2">
              Welcome Back
            </GradientText>
            <p className="text-gray-400">
              Sign in to continue to your account
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassPanel className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full bg-gradient-to-r from-purple-600 to-blue-600",
                  "hover:from-purple-700 hover:to-blue-700",
                  "text-white py-2 rounded-lg flex items-center justify-center gap-2",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={cn(
                    "border-white/10 hover:bg-white/5",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Chrome className="w-4 h-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "border-white/10 hover:bg-white/5",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign up
              </Link>
            </p>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}