import { motion } from 'framer-motion';
import { AnalyticsSummary } from '@/components/dashboard/AnalyticsSummary';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { ComplianceCalendar } from '@/components/dashboard/ComplianceCalendar';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { useTransactions } from '@/hooks/useTransactions';

export function Analytics() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate monthly growth (example calculation)
  const growth = 15; // This should be calculated based on actual data

  // Mock compliance tasks (should come from an API)
  const complianceTasks = [
    {
      id: '1',
      title: 'GSTR-1 Filing',
      dueDate: '2024-03-11',
      type: 'gst',
      status: 'pending',
    },
    {
      id: '2',
      title: 'TDS Return',
      dueDate: '2024-03-15',
      type: 'tds',
      status: 'completed',
    },
    // Add more tasks
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Analytics</h1>

      <AnalyticsSummary
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        growth={growth}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardChart transactions={transactions} />
        <ComplianceCalendar tasks={complianceTasks} />
      </div>

      <RecentTransactions transactions={transactions} />
    </motion.div>
  );
}