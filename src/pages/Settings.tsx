import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { Card3D } from '@/components/ui/card-3d';
import { cn } from '@/lib/utils';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Building2,
  LogOut,
  ChevronRight,
  Save,
  Lock
} from 'lucide-react';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    color: '#3b82f6',
    description: 'Manage your personal information'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    color: '#f59e0b',
    description: 'Configure your notification preferences'
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    color: '#22c55e',
    description: 'Update your security settings'
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    icon: CreditCard,
    color: '#ec4899',
    description: 'Manage your subscription and billing'
  }
];

export function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <GradientText className="text-4xl font-bold mb-2">
              Settings
            </GradientText>
            <p className="text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            className={cn(
              "bg-gradient-to-r from-purple-600 to-blue-600",
              "hover:from-purple-700 hover:to-blue-700",
              "text-white flex items-center gap-2"
            )}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="space-y-4">
            {settingsSections.map((section) => (
              <Card3D
                key={section.id}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-300",
                  "hover:scale-105"
                )}
                glowColor={section.color}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${section.color}20` }}
                  >
                    <section.icon
                      className="w-5 h-5"
                      style={{ color: section.color }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white">{section.title}</h4>
                    <p className="text-sm text-gray-400">
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card3D>
            ))}

            <Button
              variant="outline"
              className={cn(
                "w-full mt-4 border-white/10 hover:bg-white/5",
                "text-red-400 hover:text-red-300",
                "flex items-center gap-2"
              )}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            <GlassPanel className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500"
                      )}
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="john@company.com"
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
                    Company Name
                  </label>
                  <div className="relative">
                    <Input
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
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 bg-white/5 border-white/10",
                        "focus:border-purple-500 focus:ring-purple-500",
                        "placeholder:text-gray-500"
                      )}
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Notification Settings */}
            <GlassPanel className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {['Email Notifications', 'Push Notifications', 'SMS Alerts'].map((pref) => (
                  <div
                    key={pref}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                  >
                    <div>
                      <h4 className="font-medium text-white">{pref}</h4>
                      <p className="text-sm text-gray-400">
                        Receive notifications about updates and activity
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className={cn(
                        "w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer",
                        "peer-checked:after:translate-x-full peer-checked:bg-purple-600",
                        "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                        "after:bg-white after:rounded-full after:h-5 after:w-5",
                        "after:transition-all"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Security Settings */}
            <GlassPanel className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-medium text-white mb-2">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5"
                  >
                    Enable 2FA
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-medium text-white mb-2">
                    Active Sessions
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Manage your active sessions across devices
                  </p>
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 text-red-400 hover:text-red-300"
                  >
                    Sign Out All Devices
                  </Button>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </motion.div>
    </div>
  );
}