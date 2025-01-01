import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { Card3D } from '@/components/ui/card-3d';
import { cn } from '@/lib/utils';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  FileText,
  Tag,
  MoreVertical
} from 'lucide-react';

const transactionTypes = [
  {
    id: 'all',
    title: 'All Transactions',
    count: 156,
    color: '#3b82f6'
  },
  {
    id: 'income',
    title: 'Income',
    count: 89,
    color: '#22c55e'
  },
  {
    id: 'expense',
    title: 'Expenses',
    count: 67,
    color: '#ef4444'
  },
  {
    id: 'pending',
    title: 'Pending',
    count: 12,
    color: '#f59e0b'
  }
];

const recentTransactions = [
  {
    id: 1,
    date: '2025-01-01',
    description: 'Client Payment - ABC Corp',
    category: 'Income',
    amount: 15000,
    status: 'completed',
    type: 'credit'
  },
  {
    id: 2,
    date: '2025-01-01',
    description: 'Office Supplies',
    category: 'Expense',
    amount: 2500,
    status: 'completed',
    type: 'debit'
  },
  {
    id: 3,
    date: '2025-01-01',
    description: 'Freelance Work',
    category: 'Income',
    amount: 8000,
    status: 'pending',
    type: 'credit'
  },
  {
    id: 4,
    date: '2024-12-31',
    description: 'Software Subscription',
    category: 'Expense',
    amount: 1999,
    status: 'completed',
    type: 'debit'
  },
  {
    id: 5,
    date: '2024-12-31',
    description: 'Marketing Services',
    category: 'Expense',
    amount: 5000,
    status: 'pending',
    type: 'debit'
  }
];

export function Transactions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <GradientText className="text-4xl font-bold mb-2">
              Transactions
            </GradientText>
            <p className="text-gray-400">
              View and manage your financial transactions
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              className={cn(
                "bg-gradient-to-r from-purple-600 to-blue-600",
                "hover:from-purple-700 hover:to-blue-700",
                "text-white flex items-center gap-2"
              )}
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Transaction Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {transactionTypes.map((type) => (
            <Card3D
              key={type.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-300",
                "hover:scale-105"
              )}
              glowColor={type.color}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">{type.title}</h4>
                  <p className="text-2xl font-bold text-white mt-2">
                    {type.count}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${type.color}20` }}
                >
                  {type.id === 'income' ? (
                    <ArrowUpRight
                      className="w-6 h-6"
                      style={{ color: type.color }}
                    />
                  ) : type.id === 'expense' ? (
                    <ArrowDownRight
                      className="w-6 h-6"
                      style={{ color: type.color }}
                    />
                  ) : (
                    <DollarSign
                      className="w-6 h-6"
                      style={{ color: type.color }}
                    />
                  )}
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Filters and Search */}
        <GlassPanel className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow max-w-md relative">
              <Input
                type="text"
                placeholder="Search transactions..."
                className={cn(
                  "pl-10 bg-white/5 border-white/10",
                  "focus:border-purple-500 focus:ring-purple-500",
                  "placeholder:text-gray-500"
                )}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              <Tag className="w-4 h-4 mr-2" />
              Category
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </GlassPanel>

        {/* Transactions Table */}
        <GlassPanel className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-300">{transaction.date}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-white">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-300">{transaction.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={cn(
                          "font-medium",
                          transaction.type === 'credit'
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}₹
                        {transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            transaction.status === 'completed'
                              ? "bg-green-500/20 text-green-500"
                              : "bg-yellow-500/20 text-yellow-500"
                          )}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-white/5"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
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