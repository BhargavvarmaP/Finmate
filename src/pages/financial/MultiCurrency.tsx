import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, RefreshCw, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface Currency {
  code: string;
  name: string;
  rate: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
}

export function MultiCurrency() {
  const [currencies] = useState<Currency[]>([
    { code: 'USD', name: 'US Dollar', rate: 1 },
    { code: 'EUR', name: 'Euro', rate: 0.85 },
    { code: 'GBP', name: 'British Pound', rate: 0.73 },
    { code: 'INR', name: 'Indian Rupee', rate: 74.5 },
  ]);

  const [transactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  const handleConversion = () => {
    // TODO: Implement currency conversion
    toast({
      title: 'Success',
      description: 'Currency converted successfully',
    });
  };

  const handleReconciliation = () => {
    // TODO: Implement payment reconciliation
    toast({
      title: 'Success',
      description: 'Payments reconciled successfully',
    });
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Multi-Currency Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <RefreshCw className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">Currency Conversion</h3>
                <p className="text-sm text-gray-400">Real-time rates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-1 block">From</label>
                  <Select>
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-sm mb-1 block">To</label>
                  <Select>
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm mb-1 block">Amount</label>
                <Input type="number" placeholder="Enter amount" />
              </div>

              <Button onClick={handleConversion} className="w-full">
                Convert
              </Button>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <FileCheck className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Payment Reconciliation</h3>
                <p className="text-sm text-gray-400">Match payments with invoices</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm mb-1 block">Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="text-sm mb-1 block">Currency</label>
                <Select>
                  <option value="all">All Currencies</option>
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </option>
                  ))}
                </Select>
              </div>

              <Button onClick={handleReconciliation} className="w-full">
                Reconcile Payments
              </Button>
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Description</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Currency</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-700">
                    <td className="py-3">{tx.date}</td>
                    <td className="py-3">{tx.description}</td>
                    <td className="py-3">{tx.amount}</td>
                    <td className="py-3">{tx.currency}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'completed'
                            ? 'bg-green-500/20 text-green-500'
                            : tx.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
