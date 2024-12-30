import { Transaction } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/utils/format';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{transaction.description}</span>
              <span
                className={`text-lg ${
                  transaction.type === 'credit'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{transaction.category}</span>
              <span>{formatDate(transaction.date)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}