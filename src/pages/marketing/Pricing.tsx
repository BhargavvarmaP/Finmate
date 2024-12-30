import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '999',
    description: 'Perfect for small businesses',
    features: [
      'Basic GST filing',
      'Up to 100 transactions/month',
      'Email support',
      'Basic reports',
    ],
  },
  {
    name: 'Professional',
    price: '2499',
    description: 'Ideal for growing businesses',
    features: [
      'Advanced GST filing',
      'Unlimited transactions',
      'Priority support',
      'Advanced analytics',
      'TDS management',
      'Payroll processing',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Custom solutions',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'Multi-branch support',
      '24/7 support',
    ],
  },
];

export function Pricing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your business needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="text-2xl font-bold">{plan.name}</div>
                  <div className="text-3xl font-bold mt-2">
                    {plan.price === 'Custom' ? (
                      'Custom'
                    ) : (
                      <>
                        ₹{plan.price}
                        <span className="text-lg font-normal">/month</span>
                      </>
                    )}
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}