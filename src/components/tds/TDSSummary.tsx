import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/format';
import { useTDS } from '@/hooks/useTDS';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

export function TDSSummary() {
  const { summary } = useTDS();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
          <Calculator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary?.totalDeductions || 0)}
          </div>
          <Progress
            value={70}
            className="mt-2"
            indicatorClassName="bg-blue-500"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary?.pendingReturns || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Due in next 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((summary?.monthlyGrowth || 0) * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Compared to last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}