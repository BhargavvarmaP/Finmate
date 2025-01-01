import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';

interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export function ProfitLoss() {
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const data: FinancialData[] = [
    {
      month: 'Jan 2024',
      revenue: 45000,
      expenses: 32000,
      profit: 13000,
    },
    {
      month: 'Feb 2024',
      revenue: 52000,
      expenses: 35000,
      profit: 17000,
    },
    {
      month: 'Mar 2024',
      revenue: 48000,
      expenses: 36000,
      profit: 12000,
    },
    {
      month: 'Apr 2024',
      revenue: 61000,
      expenses: 39000,
      profit: 22000,
    },
    {
      month: 'May 2024',
      revenue: 55000,
      expenses: 38000,
      profit: 17000,
    },
    {
      month: 'Jun 2024',
      revenue: 67000,
      expenses: 41000,
      profit: 26000,
    },
  ];

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Profit & Loss Statement</h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            className="bg-transparent border-none text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value as typeof period)}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <h3 className="text-2xl font-semibold">
                ${totalRevenue.toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Expenses</p>
              <h3 className="text-2xl font-semibold">
                ${totalExpenses.toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Net Profit</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-semibold">
                  ${totalProfit.toLocaleString()}
                </h3>
                <span className="text-sm text-green-500">
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" name="Revenue" fill="#22c55e" />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
              <Bar dataKey="profit" name="Profit" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Download PDF</Button>
        <Button variant="outline">Export Excel</Button>
      </div>
    </div>
  );
}
