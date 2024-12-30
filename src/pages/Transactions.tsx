import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionDialog } from '@/components/transactions/TransactionDialog';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { useTransactions } from '@/hooks/useTransactions';

export function Transactions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { transactions, isLoading } = useTransactions();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <TransactionFilters />
      <TransactionTable transactions={transactions} isLoading={isLoading} />
      <TransactionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </motion.div>
  );
}