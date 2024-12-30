import { motion } from 'framer-motion';
import { Card3D } from '@/components/ui/card-3d';
import { GlassPanel } from '@/components/ui/glass-panel';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency } from '@/utils/format';

export function Dashboard() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen"
    >
      <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card3D className="p-6">
          <h2 className="text-lg font-medium text-gray-200">Total Income</h2>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {formatCurrency(totalIncome)}
          </p>
        </Card3D>

        <Card3D className="p-6">
          <h2 className="text-lg font-medium text-gray-200">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-400 mt-2">
            {formatCurrency(totalExpenses)}
          </p>
        </Card3D>

        <Card3D className="p-6">
          <h2 className="text-lg font-medium text-gray-200">Current Balance</h2>
          <p className={`text-3xl font-bold mt-2 ${
            balance >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {formatCurrency(balance)}
          </p>
        </Card3D>
      </div>

      <GlassPanel className="p-6">
        <DashboardChart transactions={transactions} />
      </GlassPanel>
    </motion.div>
  );
}