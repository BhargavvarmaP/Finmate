import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { transactionApi } from '@/services/api/transactions';
import { useToast } from '@/components/ui/use-toast';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      const data = await transactionApi.getAll();
      setTransactions(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch transactions',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await transactionApi.create(transaction);
      setTransactions((prev) => [...prev, newTransaction]);
      toast({
        title: 'Success',
        description: 'Transaction added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add transaction',
        variant: 'destructive',
      });
    }
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    try {
      const updatedTransaction = await transactionApi.update(id, data);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updatedTransaction : t))
      );
      toast({
        title: 'Success',
        description: 'Transaction updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update transaction',
        variant: 'destructive',
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionApi.delete(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast({
        title: 'Success',
        description: 'Transaction deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete transaction',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}