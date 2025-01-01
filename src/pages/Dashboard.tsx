import { motion } from 'framer-motion';
import { Card3D } from '@/components/ui/card-3d';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ArrowRight,
  FileText,
  Calendar,
  Tag,
  MoreVertical
} from 'lucide-react';

const metrics = [
  {
    title: 'Total Revenue',
    value: '₹2,45,678',
    change: '+12.5%',
    trend: 'up',
    color: '#22c55e',
    icon: DollarSign
  },
  {
    title: 'Pending GST',
    value: '₹12,345',
    change: '-8.3%',
    trend: 'down',
    color: '#ef4444',
    icon: FileText
  },
  {
    title: 'Monthly Growth',
    value: '18.2%',
    change: '+2.4%',
    trend: 'up',
    color: '#3b82f6',
    icon: ArrowRight
  }
];

const recentTransactions = [
  {
    id: 'tr1',
    date: '2025-01-01',
    description: 'Invoice Payment - ABC Corp',
    amount: '₹45,000',
    status: 'completed'
  },
  {
    id: 'tr2',
    date: '2024-12-31',
    description: 'GST Payment - December',
    amount: '₹12,500',
    status: 'pending'
  },
  {
    id: 'tr3',
    date: '2024-12-30',
    description: 'Vendor Payment - XYZ Ltd',
    amount: '₹28,750',
    status: 'completed'
  }
];

const upcomingDeadlines = [
  {
    id: 'dl1',
    title: 'GSTR-1 Filing',
    date: '2025-01-11',
    type: 'GST',
    priority: 'high'
  },
  {
    id: 'dl2',
    title: 'TDS Return',
    date: '2025-01-15',
    type: 'Tax',
    priority: 'medium'
  },
  {
    id: 'dl3',
    title: 'Annual Compliance',
    date: '2025-01-31',
    type: 'Compliance',
    priority: 'low'
  }
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#8b5cf6"
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444"
  }
};

const chartData = [
  { month: 'Jan', revenue: 5000, expenses: 3000 },
  { month: 'Feb', revenue: 7000, expenses: 4000 },
  { month: 'Mar', revenue: 6000, expenses: 3500 },
  { month: 'Apr', revenue: 8000, expenses: 4500 },
  { month: 'May', revenue: 9000, expenses: 5000 },
  { month: 'Jun', revenue: 11000, expenses: 5500 },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <GradientText className="text-3xl font-bold mb-2">
              Welcome back, Rahul
            </GradientText>
            <p className="text-gray-400">
              Here's what's happening with your business today
            </p>
          </div>
          <Button
            className={cn(
              "bg-gradient-to-r from-purple-600 to-blue-600",
              "hover:from-purple-700 hover:to-blue-700",
              "text-white px-6 py-2 rounded-lg"
            )}
          >
            Generate Report
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card3D
              key={index}
              className="p-6"
              glowColor={metric.color}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 mb-1">{metric.title}</p>
                  <h3 className="text-2xl font-bold mb-2">{metric.value}</h3>
                  <div className="flex items-center gap-1">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={cn(
                      "text-sm",
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    )}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassPanel className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">Financial Overview</h3>
              <p className="text-sm text-gray-400">Monthly revenue and expenses</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        className="bg-gray-800 border border-gray-700"
                      />
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#revenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#expenses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <ChartLegend>
                <ChartLegendContent
                  className="flex justify-center gap-8"
                />
              </ChartLegend>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="text-xl font-semibold mb-4">Tax Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        className="bg-gray-800 border border-gray-700"
                      />
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <ChartLegend>
                <ChartLegendContent
                  className="flex justify-center gap-8"
                />
              </ChartLegend>
            </div>
          </GlassPanel>
        </div>

        {/* Recent Transactions */}
        <GlassPanel className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <Button variant="outline" className="text-sm">
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Description</th>
                  <th className="text-right py-3">Amount</th>
                  <th className="text-right py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/5">
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.description}</td>
                    <td className="text-right py-3">{transaction.amount}</td>
                    <td className="text-right py-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        transaction.status === 'completed' 
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      )}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        {/* Upcoming Deadlines */}
        <GlassPanel className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5"
              >
                <div className={cn(
                  "p-2 rounded-lg",
                  deadline.priority === 'high' ? 'bg-red-500/20' :
                  deadline.priority === 'medium' ? 'bg-yellow-500/20' :
                  'bg-blue-500/20'
                )}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{deadline.title}</h4>
                  <p className="text-sm text-gray-400">{deadline.type}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{deadline.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}