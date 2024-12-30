export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  category?: string;
  reference?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color?: string;
} 