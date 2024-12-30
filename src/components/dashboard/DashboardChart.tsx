import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types';

interface DashboardChartProps {
  transactions: Transaction[];
}

export function DashboardChart({ transactions }: DashboardChartProps) {
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.month === month);

    if (existingMonth) {
      if (transaction.type === 'credit') {
        existingMonth.income += transaction.amount;
      } else {
        existingMonth.expenses += transaction.amount;
      }
    } else {
      acc.push({
        month,
        income: transaction.type === 'credit' ? transaction.amount : 0,
        expenses: transaction.type === 'debit' ? transaction.amount : 0
      });
    }
    return acc;
  }, []);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}