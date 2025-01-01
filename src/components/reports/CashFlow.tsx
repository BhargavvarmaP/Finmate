import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';

interface CashFlowData {
  date: string;
  inflow: number;
  outflow: number;
  balance: number;
}

export function CashFlow() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const data: CashFlowData[] = [
    { date: '2024-12-01', inflow: 25000, outflow: 18000, balance: 7000 },
    { date: '2024-12-08', inflow: 32000, outflow: 22000, balance: 10000 },
    { date: '2024-12-15', inflow: 28000, outflow: 19000, balance: 9000 },
    { date: '2024-12-22', inflow: 35000, outflow: 25000, balance: 10000 },
    { date: '2024-12-29', inflow: 30000, outflow: 21000, balance: 9000 },
  ];

  const totalInflow = data.reduce((sum, item) => sum + item.inflow, 0);
  const totalOutflow = data.reduce((sum, item) => sum + item.outflow, 0);
  const netCashFlow = totalInflow - totalOutflow;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Cash Flow Analysis</h2>
        <div className="flex gap-2">
          <Button
            variant={period === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('7d')}
          >
            7D
          </Button>
          <Button
            variant={period === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('30d')}
          >
            30D
          </Button>
          <Button
            variant={period === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('90d')}
          >
            90D
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Inflow</p>
              <h3 className="text-2xl font-semibold">
                ${totalInflow.toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <ArrowDownRight className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Outflow</p>
              <h3 className="text-2xl font-semibold">
                ${totalOutflow.toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Wallet className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Net Cash Flow</p>
              <h3 className="text-2xl font-semibold">
                ${netCashFlow.toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="inflow"
                name="Cash Inflow"
                stroke="#22c55e"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="outflow"
                name="Cash Outflow"
                stroke="#ef4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Net Balance"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Download Report</Button>
        <Button variant="outline">Export Data</Button>
      </div>
    </div>
  );
}
